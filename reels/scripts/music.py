"""Trilha original: piano contemporâneo + pad cinematográfico, 72 bpm, crescendo até a apresentação do Orivie."""
import numpy as np, soundfile as sf
SR=44100; DUR=30.0; N=int(SR*DUR); rng=np.random.default_rng(7)
L=np.zeros(N); R=np.zeros(N)
def hz(m): return 440*2**((m-69)/12)
def piano(m,vel,length=4.0):
    n=int(SR*length); t=np.arange(n)/SR; f=hz(m); s=np.zeros(n)
    for h in range(1,9):
        fh=f*h*np.sqrt(1+0.0004*h*h)
        if fh>SR/2.2: break
        dec=(0.9+0.35*h)*(1+(m-60)/60)
        s+=np.sin(2*np.pi*fh*t+rng.random()*6)*np.exp(-t*dec)/(h**1.4)
    s*=np.minimum(t/0.004,1)*(0.6+0.4*np.exp(-t*0.6))
    s+=rng.normal(0,1,n)*np.exp(-t*90)*0.02
    return s*vel
def pad(ms,t0,t1,vel):
    n=int(SR*(t1-t0)); t=np.arange(n)/SR; s=np.zeros(n)
    for m in ms:
        for d in(-0.08,0.0,0.08):
            f=hz(m)*2**(d/12); s+=np.sin(2*np.pi*f*t+rng.random()*6)+0.18*np.sin(4*np.pi*f*t)
    env=np.minimum(t/1.2,1)*np.minimum((t1-t0-t)/1.0,1)
    return s*env*vel/len(ms)
def add(sig,t,pan=0.0):
    i=int(t*SR); j=min(N,i+len(sig)); seg=sig[:j-i]
    L[i:j]+=seg*np.sqrt(0.5*(1-pan)); R[i:j]+=seg*np.sqrt(0.5*(1+pan))
beat=60/72; bar=4*beat
# Bm G D A | Bm G D A | Dadd9 (final)
chords=[[47,54,59,62,66],[43,50,55,59,62],[50,57,62,66,69],[45,52,57,61,64]]*2+[[50,57,62,64,66,69]]
for ci,ch in enumerate(chords):
    t0=ci*bar
    if t0>=DUR: break
    last=ci==len(chords)-1
    lvl=0.5+0.07*ci  # crescimento gradual
    # pad
    p_end=DUR if last else t0+bar+0.6
    add(pad([x+12 for x in ch[1:4]],t0,p_end,0.035*lvl*(1.6 if ci>=5 else 1)),t0,0)
    if ci>=5: add(pad([x+24 for x in ch[2:5]],t0,p_end,0.02*lvl),t0,0.2)  # cordas agudas na apresentação
    # baixo
    if ci>=2: add(piano(ch[0]-12,0.5*lvl,5),t0,-0.1)
    if last:
        for k,m in enumerate(ch): add(piano(m+12,0.55,6),t0+0.03*k,(k-3)/6)
        add(piano(ch[0]-12,0.7,6),t0,0); add(piano(ch[-1]+24,0.3,6),t0+bar*0.75,0.3)
        continue
    # arpejo: esparso no início, colcheias a partir da cena 4
    up=[ch[1]+12,ch[2]+12,ch[3]+12,ch[4]+12,ch[3]+12,ch[2]+12,ch[4]+12,ch[3]+24]
    step=beat if ci<3 else (beat/2 if ci>=5 else beat)
    k=0; t=t0
    while t<t0+bar-0.01:
        if ci>=3 or k%2==0:
            v=(0.32+0.12*(k%4==0))*lvl*(0.9+0.2*rng.random())
            add(piano(up[k%len(up)],v),t+rng.normal(0,0.008),(k%3-1)*0.35)
        k+=1; t+=step
    if ci>=1 and ci<5: add(piano(ch[4]+24,0.12*lvl,4),t0+beat*2.5,0.4)  # gotas agudas
# reverb (IR de ruído decaído, estéreo)
irn=int(SR*2.6); ti=np.arange(irn)/SR
def ir():
    x=rng.normal(0,1,irn)*np.exp(-ti*2.4); x[:int(0.02*SR)]*=np.linspace(0,1,int(0.02*SR)); return x/np.sqrt(np.sum(x**2))
def conv(a,b):
    n=len(a)+len(b); F=1<<int(np.ceil(np.log2(n)))
    return np.fft.irfft(np.fft.rfft(a,F)*np.fft.rfft(b,F),F)[:len(a)]
wl=conv(L,ir()); wr=conv(R,ir())
L2=L*0.75+wl*0.55; R2=R*0.75+wr*0.55
# leve passa-baixa para calor
def lp(x,a=0.35):
    y=np.empty_like(x); acc=0.0
    from scipy.signal import lfilter
    return lfilter([a],[1,-(1-a)],x)
try: L2,R2=lp(L2),lp(R2)
except Exception: pass
out=np.stack([L2,R2],1); t=np.arange(N)/SR
out*=np.minimum(t/1.5,1)[:,None]*np.minimum((DUR-t)/1.2,1)[:,None]
out/=np.max(np.abs(out))*1.12
sf.write("build/music.wav",out,SR); print("ok",out.shape)
