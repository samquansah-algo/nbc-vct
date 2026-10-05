"""Original score for NBC Story (62 s). Synthesised from scratch; no samples, no licensed audio.
Key: A minor -> C major resolve at the logo. Tempo 96 BPM. Every hit is synced to a scene event in motion.html."""
import numpy as np
from scipy.io import wavfile
SR = 44100; DUR = 62.0; N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
BPM = 96; BEAT = 60 / BPM
def hz(n): return 440 * 2 ** ((n - 69) / 12)   # MIDI -> Hz
def env(n, a, d, s, r, hold):
    t = np.arange(n) / SR; e = np.zeros(n)
    a_n, d_n, h_n = int(a*SR), int(d*SR), int(hold*SR)
    e[:a_n] = np.linspace(0, 1, a_n, endpoint=False) if a_n else 1
    e[a_n:a_n+d_n] = np.linspace(1, s, d_n, endpoint=False)
    e[a_n+d_n:h_n] = s
    rr = n - max(h_n, a_n+d_n)
    if rr > 0: e[max(h_n, a_n+d_n):] = s * np.exp(-np.arange(rr) / (r*SR))
    return e
def add(sig, t0, gain=1.0, pan=0.0):
    i = int(t0 * SR); j = min(N, i + len(sig))
    if i >= N or j <= i: return
    s = sig[:j-i] * gain
    L[i:j] += s * np.sqrt((1 - pan) / 2) * 1.41; R[i:j] += s * np.sqrt((1 + pan) / 2) * 1.41
def lowpass(x, fc):
    a = np.exp(-2*np.pi*fc/SR); y = np.zeros_like(x); p = 0.0
    for k in range(len(x)): p = (1-a)*x[k] + a*p; y[k] = p
    return y
def lowpass_fast(x, fc):
    # vectorised one-pole via scipy
    from scipy.signal import lfilter
    a = np.exp(-2*np.pi*fc/SR); return lfilter([1-a], [1, -a], x)
def pad(notes, t0, dur, gain=.08, bright=1200):
    n = int((dur + 2.5) * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for m in notes:
        f = hz(m)
        for det in (-0.12, 0, 0.12):
            ff = f * 2 ** (det/12)
            s += (np.sin(2*np.pi*ff*t) + .35*np.sin(2*np.pi*2*ff*t) + .15*np.sin(2*np.pi*3*ff*t))
    s = lowpass_fast(s, bright) * env(n, 1.2, .5, .8, 1.2, dur) / (len(notes)*3)
    add(s, t0, gain, -.2); add(s, t0 + .011, gain*.8, .3)
def pluck(m, t0, gain=.22, pan=0, decay=.9, bright=1.0):
    n = int((decay*4) * SR); t = np.arange(n)/SR; f = hz(m)
    s = (np.sin(2*np.pi*f*t) + .5*bright*np.sin(2*np.pi*2*f*t)*np.exp(-t*6) + .25*bright*np.sin(2*np.pi*3*f*t)*np.exp(-t*9))
    s *= np.exp(-t/decay) * np.minimum(1, t/0.004)
    add(s, t0, gain, pan)
def marimba(m, t0, gain=.3, pan=0):
    n = int(1.6*SR); t = np.arange(n)/SR; f = hz(m)
    s = (np.sin(2*np.pi*f*t) + .3*np.sin(2*np.pi*4*f*t)*np.exp(-t*25)) * np.exp(-t*3.2) * np.minimum(1, t/0.002)
    add(s, t0, gain, pan)
def kick(t0, gain=.55):
    n = int(.5*SR); t = np.arange(n)/SR
    f = 42 + 90*np.exp(-t*28); ph = 2*np.pi*np.cumsum(f)/SR
    s = np.sin(ph) * np.exp(-t*7) ; s += .25*np.random.RandomState(1).randn(n)*np.exp(-t*90)
    add(s, t0, gain)
def hat(t0, gain=.06, pan=.3, open_=False):
    n = int((.25 if open_ else .06)*SR); t = np.arange(n)/SR
    s = np.random.RandomState(int(t0*1000) % 9999).randn(n); s = s - lowpass_fast(s, 6000)
    s *= np.exp(-t*(14 if open_ else 70)); add(s, t0, gain, pan)
def click(t0, m=96, gain=.05, pan=0):
    n = int(.08*SR); t = np.arange(n)/SR; s = np.sin(2*np.pi*hz(m)*t)*np.exp(-t*60); add(s, t0, gain, pan)
def swoosh(t0, dur, f0, f1, gain=.12, pan=0):
    n = int(dur*SR); t = np.arange(n)/SR
    nz = np.random.RandomState(int(t0*100)).randn(n)
    fc = f0 + (f1-f0)*(t/dur); out = np.zeros(n); a = 0.0
    from scipy.signal import lfilter
    seg = 2048
    for k in range(0, n, seg):
        c = fc[min(k+seg//2, n-1)]; al = np.exp(-2*np.pi*c/SR)
        out[k:k+seg] = lfilter([1-al], [1, -al], nz[k:k+seg])
    e = np.sin(np.pi*np.clip(t/dur, 0, 1))**1.5
    add(out*e*3, t0, gain, pan)
def riser(t0, dur, m0, m1, gain=.06):
    n = int(dur*SR); t = np.arange(n)/SR; f = hz(m0)*(hz(m1)/hz(m0))**(t/dur)
    s = np.sin(2*np.pi*np.cumsum(f)/SR)*(t/dur)**2; add(lowpass_fast(s, 3000), t0, gain)
def sub(m, t0, dur, gain=.18):
    n = int((dur+1)*SR); t = np.arange(n)/SR; s = np.sin(2*np.pi*hz(m)*t)*env(n, .05, .2, .7, .5, dur); add(s, t0, gain)

Am, F, C, G, Em, Dm = [57,60,64], [53,57,60], [48,55,64], [55,59,62], [52,55,59], [50,53,57]
# ---------- S1 0–4.6: stillness, the piece drops ----------
pad([Am[0]-12]+Am, 0.0, 4.6, .12, 800)
swoosh(0.2, 1.0, 400, 2400, .05)
for tt, g in [(1.18, .5), (1.52, .22), (1.72, .1)]: kick(tt, g)                 # bounce on landing
for i, tt in enumerate([1.5, 1.72, 1.94, 2.16, 2.38]): marimba([69,72,76,72,81][i], tt, .16, -.3+.15*i)   # words
# ---------- S2 4.6–9.2: answers flood ----------
pad(F, 4.6, 4.6, .06, 900)
rng = np.random.RandomState(4)
for k in range(34): click(4.8 + rng.rand()*1.8, 90 + rng.randint(0, 12), .035, rng.rand()*1.6-.8)
riser(5.0, 2.0, 60, 84, .04)
sub(41, 6.3, 2.8, .16); pluck(65, 6.3, .2); pluck(69, 6.3, .14, .3)               # "Answers are everywhere"
swoosh(7.0, 1.0, 3000, 300, .05)                                                    # fade to grey
# ---------- S3 9.2–16.2: investigate, build, get it wrong, try again ----------
pad(C, 9.2, 7.0, .06, 1400)
for i, (tt, m) in enumerate([(10.0, 72), (10.7, 76), (11.4, 79), (12.1, 84)]):
    marimba(m, tt, .3, -.4 + .27*i); kick(tt, .25)
# wrong: detuned wobble
n = int(1.0*SR); t = np.arange(n)/SR; s = np.sin(2*np.pi*hz(66)*(1 + .03*np.sin(2*np.pi*7*t))*t)*np.exp(-t*3); add(s, 11.95, .12, .2)
pluck(79, 12.1, .18, .3, 1.4)                                                         # try again lifts
pad(G, 13.6, 2.6, .05, 1600); sub(43, 13.6, 2.4, .14)
# ---------- S4 16.2–24.4: the ramp; groove starts ----------
groove_start, groove_end = 16.25, 44.6
b = groove_start; k = 0
while b < groove_end:
    if 24.3 < b < 24.6: b += BEAT; k += 1; continue
    kick(b, .38 if k % 2 == 0 else .3)
    hat(b + BEAT/2, .05, .35);
    if k % 4 == 3: hat(b + BEAT*0.75, .035, -.35)
    b += BEAT; k += 1
prog = [Am, F, C, G]
t0 = 16.25
for i in range(int((44.6 - 16.25) / (BEAT*4)) + 1):
    ch = prog[i % 4]; tt = t0 + i*BEAT*4
    if tt >= 44.6: break
    pad(ch, tt, BEAT*4, .05, 1100); sub(ch[0]-12, tt, BEAT*4-.1, .15)
swoosh(16.9, 1.5, 300, 1200, .10, -.3)                                               # car rolls
click(18.4, 84, .12); marimba(64, 18.4, .2)                                          # stops short (142 cm)
riser(19.2, .9, 55, 67, .07)                                                          # ramp rises
swoosh(20.6, 1.8, 300, 1600, .11, .3)                                                 # rolls farther
marimba(76, 22.35, .28); marimba(83, 22.45, .18, .3)                                  # 187 cm
# ---------- S5 24.4–31.4: grid assembles and lights ----------
swoosh(24.5, 1.4, 600, 4000, .06)
arp = [69, 72, 76, 79, 81, 84, 88, 84]
for i in range(32): pluck(arp[i % 8], 27.6 + i*(BEAT/4), .07, (i % 4)/2 - .75, .35)
# ---------- S6 31.4–37.8: the formula ----------
for tt, m in [(31.8, 60), (32.5, 64), (33.2, 67)]: pluck(m, tt, .22, 0, 1.2); pluck(m+12, tt, .1, .3, .8)
riser(33.6, .5, 67, 79, .05)
for m in [72, 76, 79, 84]: pluck(m, 34.1, .14, 0, 1.8)                                # capability resolves
# ---------- S7 37.8–44.6: the offer ----------
for i in range(4): marimba([72, 74, 76, 79][i], 39.2 + i*.35, .22, -.45 + .3*i)
pluck(84, 41.6, .12, 0, 1.5)
# ---------- S8 44.6–51.4: Cape Coast, then the next billion ----------
pad([45, 52, 57, 64], 44.6, 3.6, .16, 1300); sub(33, 44.6, 3.4, .22)
kick(44.95, .4)
for i in range(14): click(45.6 + i*.1, 100 + (i % 3), .025)
pad([48, 55, 60, 64, 67], 48.2, 3.4, .17, 2400); riser(48.2, 3.0, 60, 88, .09)
for i in range(8): kick(48.2 + i*BEAT/2, .12 + .03*i)
rng = np.random.RandomState(9)
for i in range(40): pluck(int(rng.choice([72, 76, 79, 84, 88, 91])), 48.2 + rng.rand()*1.8, .07, rng.rand()*1.8-.9, .5)
# ---------- S9 51.4–62: one piece, the logo ----------
swoosh(51.5, 1.4, 4000, 300, .07)                                                     # converge
kick(53.4, .6); sub(36, 53.4, 7.5, .2)
pad([36, 48, 55, 60, 64, 67, 72], 53.4, 7.0, .09, 1800)                               # C major resolve
for m, d in [(72, 0), (76, .12), (79, .24), (84, .36)]: pluck(m, 53.4 + d, .12, -.3 + d, 2.2)
marimba(88, 54.6, .12, .3)

# ---------- master: light reverb, fade, normalise ----------
def reverb(x, mix=.22):
    y = x.copy()
    for dly, g in [(.031, .5), (.047, .45), (.071, .38), (.113, .3), (.167, .22)]:
        d = int(dly*SR); z = np.zeros_like(x); z[d:] = x[:-d]*g; y += z*mix*2
    return lowpass_fast(y, 9000)
L, R = reverb(L), reverb(R)
fade = np.ones(N); fi = int(.3*SR); fo = int(2.2*SR); fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
L *= fade; R *= fade
mx = max(np.abs(L).max(), np.abs(R).max()); L, R = L/mx*.89, R/mx*.89
wavfile.write('NBC_Story_score.wav', SR, (np.stack([L, R], 1)*32767).astype(np.int16))
print('ok', round(float(np.sqrt(np.mean(L**2))), 3))
