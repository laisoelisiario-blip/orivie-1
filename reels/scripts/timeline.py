"""Alinha cada linha de legenda às pausas reais da narração (envelope de energia) e grava build/timeline.json."""
import json
vo=json.load(open("build/vo.json")); caps=[]
for sc in vo:
    env=sc["env"]; n=len(env); thr=max(env)*0.06; lines=sc["lines"]
    # pausas: sequências >=4 janelas (80 ms) abaixo do limiar
    gaps=[];j=0
    while j<n:
        if env[j]<thr:
            k=j
            while k<n and env[k]<thr:k+=1
            if k-j>=4 and j>3 and k<n-3: gaps.append(((j+k)/2*0.02,(k-j)))
            j=k
        else:j+=1
    tot=sum(len(l) for l in lines); cuts=[]; acc=0
    for l in lines[:-1]:
        acc+=len(l); target=acc/tot*sc["dur"]
        cand=[g for g in gaps if all(abs(g[0]-c)>0.3 for c in cuts)]
        best=min(cand,key=lambda g:abs(g[0]-target)-0.02*g[1]) if cand else (target,0)
        cuts.append(best[0] if abs(best[0]-target)<0.8 else target)
    b=[0]+sorted(cuts)+[sc["dur"]]
    for i,l in enumerate(lines):
        caps.append({"text":l,"t0":round(sc["start"]+b[i],3),"t1":round(sc["start"]+b[i+1],3),"scene":sc["scene"]})
json.dump({"captions":caps,"vo":[{"file":s["file"],"start":s["start"],"dur":s["dur"]} for s in vo]},open("build/timeline.json","w"),ensure_ascii=False,indent=1)
for c in caps:print(f'{c["t0"]:6.2f}-{c["t1"]:6.2f} {c["text"]}')
