"""Original score for 'Introducing Learning Worlds' (86 s). Felt piano, warm pads and soft UI sounds, synthesised from scratch.
C major, about 84 BPM. Every cue lines up with an event in motion2.html."""
import numpy as np
from scipy.io import wavfile
from scipy.signal import lfilter
SR = 44100; DUR = 86.0; N = int(SR*DUR)
L = np.zeros(N); R = np.zeros(N)
def hz(m): return 440*2**((m-69)/12)
def lp(x, fc): a = np.exp(-2*np.pi*fc/SR); return lfilter([1-a], [1, -a], x)
def add(s, t0, g=1.0, pan=0.0):
    i = int(t0*SR); j = min(N, i+len(s))
    if j <= i: return
    s = s[:j-i]*g; L[i:j] += s*np.sqrt((1-pan)/2)*1.41; R[i:j] += s*np.sqrt((1+pan)/2)*1.41
def piano(m, t0, vel=.5, pan=0.0, dur=3.5):
    n = int(dur*SR); t = np.arange(n)/SR; f = hz(m); s = np.zeros(n)
    for k, (a, d) in enumerate([(1, 1.8), (.32, 1.1), (.12, .7), (.05, .45)], 1):
        fk = f*k*(1+.0004*k*k); s += a*np.sin(2*np.pi*fk*t + k)*np.exp(-t/(d*(1.6 if m < 60 else 1.0)))
    ham = 0
    s = lp(lp(s + ham, 900 + 900*vel), 2400) * np.minimum(1, t/.012)
    add(s, t0, .12*vel, pan)
def chord(ms, t0, vel=.4, spread=.035, pan=0):
    for i, m in enumerate(ms): piano(m, t0+i*spread, vel*(1-.08*i), pan+(i-len(ms)/2)*.08)
def pad(ms, t0, dur, g=.05, bright=900, att=1.8, rel=2.0):
    n = int((dur+rel*2)*SR); t = np.arange(n)/SR; s = np.zeros(n)
    for m in ms:
        for det in (-.07, 0, .07):
            f = hz(m)*2**(det/12); s += np.sin(2*np.pi*f*t) + .25*np.sin(2*np.pi*2*f*t)
    e = np.minimum(1, t/att); e *= np.where(t < dur, 1, np.exp(-(t-dur)/rel))
    s = lp(s, bright)*e/(len(ms)*3); add(s, t0, g, -.15); add(s, t0+.013, g*.85, .2)
def tick(t0, g=.05, f=2200):
    n = int(.5*SR); t = np.arange(n)/SR; f = 660; add(lp(np.sin(2*np.pi*f*t)*np.minimum(1, t/.015)*np.exp(-t*9), 1500), t0, g*.35)
def chime(ms, t0, g=.07):
    for i, m in enumerate(ms):
        n = int(1.5*SR); t = np.arange(n)/SR; s = lp(np.sin(2*np.pi*hz(m-12)*t)*np.minimum(1, t/.02)*np.exp(-t*2.2), 1800)
        add(s, t0+i*.12, g*.45, .2)
def brush(t0, dur, g=.03):
    g = g*.5
    n = int(dur*SR); t = np.arange(n)/SR; s = lp(np.random.RandomState(int(t0)).randn(n), 900); s -= lp(s, 200)
    add(s*np.sin(np.pi*t/dur)**2, t0, g)
def boom(t0, g=.18):
    g = g*.45
    n = int(2.5*SR); t = np.arange(n)/SR; f = 38+30*np.exp(-t*4); add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*1.6)*np.minimum(1, t/.02), t0, g)
def swell(t0, dur, ms, g=.05):
    n = int(dur*SR); t = np.arange(n)/SR; s = np.zeros(n)
    for m in ms: s += np.sin(2*np.pi*hz(m)*t)
    add(lp(s, 1500)*(t/dur)**2.2/len(ms), t0, g)

C, Am, F, G, Em, Dm = [48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 57, 60], [43, 50, 55, 59], [40, 47, 55, 59], [38, 50, 53, 57]
# 1 · 0–7  stillness
pad([48, 55, 62, 64], 0.0, 6.6, .06, 700)
piano(76, .6, .35, .1)
for i, m in enumerate([67, 72, 76]): piano(m, 2.4+i*.32, .32, -.2+.2*i)
# 2 · 7–14
pad([45, 52, 59, 60], 7.0, 6.6, .06, 750)
for i, m in enumerate([69, 72, 76]): piano(m, 7.6+i*.3, .32)
for i, m in enumerate([65, 69, 72]): piano(m, 9.6+i*.3, .28, .2)
piano(41, 9.6, .3)
# 3 · 14–26  the loop: a quiet piano ostinato
beat = 60/84; e8 = beat/2
prog = [(14.2, C), (17.6, Am), (19.6, [41, 48, 55, 59]), (22.0, G), (24.0, C)]   # 'get it wrong' = F with a B (tension)
for k, (t0, ch) in enumerate(prog):
    t1 = prog[k+1][0] if k+1 < len(prog) else 26.0
    pad(ch, t0, t1-t0, .045, 900, 1.0, 1.0); piano(ch[0], t0, .38)
    pat = [ch[1]+12, ch[2]+12, ch[3]+12, ch[2]+12]; tt = t0; i = 0
    while tt < t1-.05: piano(pat[i % 4], tt, .22 + (.06 if i % 4 == 0 else 0), (-.3, .3)[i % 2], 1.6); tt += e8; i += 1
for tt, m in [(15.2, 76), (17.6, 79), (19.6, 71), (22.0, 79)]: piano(m, tt, .45)
piano(72, 23.2, .4); brush(16.6, 1.8); brush(21.0, 2.2)
# 4 · 26–32  reflective
pad([45, 52, 57, 64], 26.0, 5.6, .06, 650); piano(64, 26.6, .3); piano(60, 27.4, .26); piano(57, 28.6, .24)
# 5 · 32–40  Introducing
swell(31.4, 1.9, [60, 64, 67, 72], .07)
boom(33.2, .16); pad([41, 53, 57, 60, 64], 33.2, 6.4, .08, 1500, 1.0, 2.5)
chord([53, 57, 60, 64, 69], 33.2, .5)
piano(76, 35.4, .35, .2)
# 6 · 40–49  the kit: ostinato returns, brighter
for k, (t0, ch) in enumerate([(40.0, C), (43.0, G), (46.0, Am)]):
    t1 = [43.0, 46.0, 49.0][k]; pad(ch, t0, t1-t0, .045, 1200, .8, 1.0); piano(ch[0], t0, .36)
    pat = [ch[1]+12, ch[3]+12, ch[2]+12, ch[3]+12]; tt = t0; i = 0
    while tt < t1-.05: piano(pat[i % 4], tt, .2+(.06 if i % 4 == 0 else 0), (-.3, .3)[i % 2], 1.4); tt += e8; i += 1
for i, m in enumerate([72, 76, 79, 84]): chime([m], 40.6+i*.45, .045)
# 7 · 49–59  the assistant
pad([41, 48, 57, 64], 49.0, 9.6, .055, 900)
for i, m in enumerate([65, 69, 72, 76]): piano(m, 49.6+i*.9, .26, -.2+.13*i, 2.5)
tick(51.3, .03, 1800); tick(53.9, .06, 2400); chime([79, 84], 54.3, .07)
piano(72, 55.4, .34); piano(76, 55.7, .3)
# 8 · 59–67  evidence
pad([48, 55, 60, 64], 59.0, 7.6, .055, 900)
for i in range(4): tick(60.4+i*.6, .03, 1600+i*200); piano([72, 74, 76, 79][i], 60.4+i*.6, .22, .2)
piano(60, 63.2, .3); piano(67, 63.5, .26)
# 9 · 67–77  place, then the next billion
pad([45, 52, 57, 60], 67.0, 4.8, .06, 800); piano(69, 67.6, .32); piano(64, 69.0, .28)
swell(70.5, 2.6, [55, 60, 64, 67, 72], .06)
pad([43, 50, 55, 59, 62, 67], 72.2, 4.6, .075, 1600, 1.2, 1.5)
rng = np.random.RandomState(5)
for i in range(26): piano(int(rng.choice([79, 81, 84, 86, 88, 91])), 72.2+rng.rand()*2.6, .14, rng.rand()*1.6-.8, 1.4)
chord([55, 59, 62, 67], 73.2, .42)
# 10 · 77–86  resolve on the logo
boom(78.0, .12); pad([36, 48, 55, 60, 64, 67, 72], 78.0, 6.0, .085, 1300, 1.4, 2.6)
chord([48, 55, 60, 64, 67, 72], 78.0, .5, .05)
piano(76, 80.0, .3, .2); piano(79, 81.6, .26, -.2); piano(84, 82.8, .22)

def room(x):
    y = x.copy()
    for d, g in [(.029, .40), (.047, .36), (.071, .32), (.101, .28), (.149, .24), (.211, .20), (.293, .16), (.401, .12), (.557, .08)]:
        k = int(d*SR); z = np.zeros_like(x); z[k:] = lp(x[:-k], 3500)*g; y += z*.6
    return lp(y, 6000)
L, R = room(L), room(R)
f = np.ones(N); f[:int(.4*SR)] = np.linspace(0, 1, int(.4*SR)); fo = int(3.0*SR); f[-fo:] = np.linspace(1, 0, fo)**1.5
L *= f; R *= f; mx = max(abs(L).max(), abs(R).max()); L, R = L/mx*.89, R/mx*.89
wavfile.write('NBC_Story_v2_score.wav', SR, (np.stack([L, R], 1)*32767).astype(np.int16)); print('ok')
