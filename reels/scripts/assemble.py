"""Mixa narração + trilha (com ducking) e monta o MP4 final com textura de filme."""
import json, subprocess
tl=json.load(open("build/timeline.json"))
ins=[]; f=[]
for i,v in enumerate(tl["vo"]):
    ins+=["-i",v["file"]]; ms=int(v["start"]*1000)
    f.append(f"[{i+1}:a]aresample=44100,highpass=f=80,equalizer=f=3000:t=q:w=1.2:g=2,adelay={ms}|{ms},apad[v{i}]")
n=len(tl["vo"])
f.append("".join(f"[v{i}]" for i in range(n))+f"amix=inputs={n}:normalize=0:duration=longest,atrim=0:30,pan=stereo|c0=c0|c1=c0,volume=1.6,asplit[vo][sc]")
f.append("[0:a]volume=0.55[mu]")
f.append("[mu][sc]sidechaincompress=threshold=0.04:ratio=4:attack=30:release=450[duck]")
f.append("[duck][vo]amix=inputs=2:normalize=0,atrim=0:30,loudnorm=I=-14:TP=-1.5:LRA=9[a]")
subprocess.run(["ffmpeg","-y","-loglevel","error","-i","build/music.wav",*ins,"-filter_complex",";".join(f),"-map","[a]","-ar","48000","build/mix.wav"],check=True)
vf=("eq=contrast=1.03:saturation=0.96:gamma=1.01,"
    "curves=r='0/0.03 0.5/0.51 1/0.98':g='0/0.02 0.5/0.5 1/0.97':b='0/0.03 0.5/0.47 1/0.93',"
    "noise=alls=7:allf=t,vignette=PI/8,format=yuv420p")
subprocess.run(["ffmpeg","-y","-loglevel","error","-framerate","30","-i","build/frames/f%04d.jpg","-i","build/mix.wav",
  "-vf",vf,"-c:v","libx264","-preset","slow","-crf","20","-profile:v","high","-r","30","-c:a","aac","-b:a","256k",
  "-t","30","-movflags","+faststart","output/orivie_reels_30s.mp4"],check=True)
print("ok")
