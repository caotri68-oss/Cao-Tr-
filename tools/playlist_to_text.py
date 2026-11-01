#!/usr/bin/env python3
"""Tải phụ đề của toàn bộ video trong một playlist YouTube thành file .txt.

Cài đặt:   pip install yt-dlp youtube-transcript-api
Chạy:      python tools/playlist_to_text.py "<link playlist>" -o transcripts -l vi en

- Chạy lại nhiều lần được: video đã xong sẽ bị bỏ qua.
- Video không có phụ đề được ghi vào <out>/_thieu_phu_de.txt (xử lý bằng Whisper sau).
"""
import argparse, json, random, sys, time
from pathlib import Path

from yt_dlp import YoutubeDL
from youtube_transcript_api import YouTubeTranscriptApi


def list_playlist(url):
    with YoutubeDL({"extract_flat": True, "quiet": True, "skip_download": True}) as ydl:
        info = ydl.extract_info(url, download=False)
    return [(e["id"], e.get("title") or e["id"]) for e in info.get("entries", []) if e]


def fetch_text(video_id, langs):
    try:  # youtube-transcript-api >= 1.0
        t = YouTubeTranscriptApi().fetch(video_id, languages=langs)
        return " ".join(s.text for s in t)
    except AttributeError:  # bản cũ
        t = YouTubeTranscriptApi.get_transcript(video_id, languages=langs)
        return " ".join(s["text"] for s in t)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("playlist")
    ap.add_argument("-o", "--out", default="transcripts")
    ap.add_argument("-l", "--langs", nargs="+", default=["vi", "en"])
    ap.add_argument("--delay", type=float, default=3.0, help="giây nghỉ giữa các video")
    a = ap.parse_args()

    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    videos = list_playlist(a.playlist)
    print(f"Playlist có {len(videos)} video")
    missing, index = [], []

    for n, (vid, title) in enumerate(videos, 1):
        f = out / f"{n:03d}_{vid}.txt"
        link = f"https://youtu.be/{vid}"
        index.append({"n": n, "id": vid, "title": title, "url": link, "file": f.name})
        if f.exists():
            continue
        for attempt in range(3):
            try:
                text = fetch_text(vid, a.langs)
                f.write_text(f"{title}\n{link}\n\n{text}\n", encoding="utf-8")
                print(f"[{n}/{len(videos)}] OK  {title}")
                break
            except Exception as e:
                name = type(e).__name__
                if name in ("TranscriptsDisabled", "NoTranscriptFound"):
                    missing.append(f"{link}\t{title}")
                    print(f"[{n}/{len(videos)}] THIẾU PHỤ ĐỀ  {title}")
                    break
                print(f"[{n}/{len(videos)}] lỗi {name}, thử lại ({attempt+1}/3)")
                time.sleep(10 * (attempt + 1))
        else:
            missing.append(f"{link}\t{title}\t(lỗi mạng/bị giới hạn)")
        time.sleep(a.delay + random.random() * 2)

    (out / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=2), encoding="utf-8")
    if missing:
        (out / "_thieu_phu_de.txt").write_text("\n".join(missing), encoding="utf-8")
    print(f"Xong. Thiếu phụ đề: {len(missing)}/{len(videos)}")


if __name__ == "__main__":
    sys.exit(main())
