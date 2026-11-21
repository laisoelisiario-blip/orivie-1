"""Narração: voz feminina pt-BR (Kokoro, voz pf_dora), gerada cena a cena para manter a entonação natural.
Uso: python3 scripts/tts.py <pasta_modelo> [velocidade]"""
import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
M=sys.argv[1]; SP=float(sys.argv[2]) if len(sys.argv)>2 else 1.1
k=Kokoro(f"{M}/kokoro.onnx",f"{M}/voices.bin")
data=json.load(open("scripts/narration.json"))
out=[]
for sc in data:
    text=" ".join(sc["lines"]).replace("…","...")
    s,sr=k.create(text,voice="pf_dora",speed=sc.get("speed",SP),lang="pt-br")
    idx=np.where(np.abs(s)>0.01)[0]; s=s[max(idx[0]-240,0):idx[-1]+2400]
    # mapa de energia para alinhar legendas (janelas de 20 ms)
    w=int(sr*0.02); env=[float(np.sqrt(np.mean(s[j:j+w]**2))) for j in range(0,len(s),w)]
    f=f"build/vo_{sc['scene']}.wav"; sf.write(f,s,sr)
    out.append({**sc,"file":f,"dur":round(len(s)/sr,3),"env":env})
    print(sc["scene"],round(len(s)/sr,2))
json.dump(out,open("build/vo.json","w"),ensure_ascii=False)
