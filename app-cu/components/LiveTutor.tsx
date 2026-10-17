import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Volume2, Radio, AlertCircle } from 'lucide-react';
import { createBlob, decodeAudioData, base64ToUint8Array } from '../services/audioUtils';

export const LiveTutor: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [isTalking, setIsTalking] = useState(false); // Model is talking
  const [error, setError] = useState<string | null>(null);
  
  // Audio Context Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Playback Refs
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Gemini Session Ref
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    setError(null);
    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found");
      }

      // Initialize AI
      aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      // Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Start Gemini Session
      const sessionPromise = aiRef.current.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Fenrir' } },
          },
          systemInstruction: `You are a dedicated Czech language tutor for a Vietnamese student (Level A1-A2).

          CORE RULE: BILINGUAL RESPONSE REQUIRED
          Every time you speak in Czech, you MUST immediately provide the Vietnamese translation or explanation.
          
          STRUCTURE:
          1. Speak the Czech phrase clearly and slightly slowly.
          2. Pause briefly.
          3. Speak the Vietnamese translation/explanation.

          EXAMPLE INTERACTION:
          Tutor: "Ahoj! Jak se dnes máš?" ... "Xin chào! Hôm nay bạn thế nào?"
          Student: "Mám se dobře."
          Tutor: "To je skvělé! Jsem rád, že to slyším." ... "Thật tuyệt vời! Tôi rất vui khi nghe điều đó."

          BEHAVIOR:
          - Be patient and encouraging.
          - If the student makes a mistake, correct them in Czech, then explain the correction in Vietnamese.
          - Keep vocabulary simple suitable for A1-A2 level.
          - Start the conversation with a bilingual greeting.`,
        },
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Connected');
            setConnected(true);
            setupAudioInput();
          },
          onmessage: async (message: LiveServerMessage) => {
            handleServerMessage(message);
          },
          onclose: () => {
            console.log('Gemini Live Closed');
            setConnected(false);
          },
          onerror: (e) => {
            console.error('Gemini Live Error', e);
            setError("Connection error. Please try again.");
            disconnect();
          }
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to connect to microphone or API.");
      disconnect();
    }
  };

  const setupAudioInput = () => {
    if (!inputAudioContextRef.current || !streamRef.current || !sessionPromiseRef.current) return;

    const ctx = inputAudioContextRef.current;
    const stream = streamRef.current;
    
    sourceRef.current = ctx.createMediaStreamSource(stream);
    scriptProcessorRef.current = ctx.createScriptProcessor(4096, 1, 1);
    
    scriptProcessorRef.current.onaudioprocess = (e) => {
      const inputData = e.inputBuffer.getChannelData(0);
      const pcmBlob = createBlob(inputData);
      
      sessionPromiseRef.current?.then((session) => {
        session.sendRealtimeInput({ media: pcmBlob });
      });
    };

    sourceRef.current.connect(scriptProcessorRef.current);
    scriptProcessorRef.current.connect(ctx.destination);
  };

  const handleServerMessage = async (message: LiveServerMessage) => {
    if (!outputAudioContextRef.current) return;

    const ctx = outputAudioContextRef.current;
    
    // Handle Audio Output
    const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      setIsTalking(true);
      
      // Ensure time builds up smoothly
      nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
      
      const audioData = base64ToUint8Array(base64Audio);
      const audioBuffer = await decodeAudioData(audioData, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        activeSourcesRef.current.delete(source);
        if (activeSourcesRef.current.size === 0) {
          setIsTalking(false);
        }
      };

      source.start(nextStartTimeRef.current);
      activeSourcesRef.current.add(source);
      nextStartTimeRef.current += audioBuffer.duration;
    }

    // Handle Interruption (User started speaking while model was speaking)
    if (message.serverContent?.interrupted) {
      console.log('Interrupted');
      activeSourcesRef.current.forEach(src => {
        try { src.stop(); } catch(e) {}
      });
      activeSourcesRef.current.clear();
      nextStartTimeRef.current = 0; // Reset timing
      setIsTalking(false);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setIsTalking(false);
    
    // Close Session
    sessionPromiseRef.current?.then(session => session.close()).catch(() => {});
    sessionPromiseRef.current = null;

    // Stop Microphone
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Close Audio Contexts
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    
    activeSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100 mt-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4 relative">
          {connected ? (
            isTalking ? (
               <Volume2 className="w-8 h-8 animate-pulse" />
            ) : (
               <Radio className="w-8 h-8 animate-pulse" />
            )
          ) : (
            <MicOff className="w-8 h-8 text-gray-400" />
          )}
          {connected && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Gia Sư Ảo (Live Tutor)</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          Luyện nói tiếng Séc trực tiếp với AI. Bấm kết nối và bắt đầu bằng câu "Ahoj".
          <br/>
          <span className="text-blue-600 font-semibold text-sm block mt-2 bg-blue-50 px-2 py-1 rounded">
            Chế độ song ngữ: Tiếng Séc + Tiếng Việt
          </span>
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg mb-6">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-4">
        {!connected ? (
          <button
            onClick={connect}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-200"
          >
            <Mic size={20} />
            Bắt đầu Hội thoại
          </button>
        ) : (
          <button
            onClick={disconnect}
            className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-red-200"
          >
            <MicOff size={20} />
            Kết thúc
          </button>
        )}
      </div>

      {connected && (
        <div className="mt-8 p-4 bg-gray-50 rounded-xl w-full text-center text-sm text-gray-500">
           <span className="font-medium text-blue-600">Trạng thái: </span>
           {isTalking ? "AI đang nói (Séc + Việt)..." : "Đang lắng nghe bạn..."}
        </div>
      )}
    </div>
  );
};
