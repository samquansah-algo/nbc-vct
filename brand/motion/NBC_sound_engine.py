"""NBC sound engine v3 · natural, hypnotic, sensory-futuristic.
Everything is synthesised from physical models: kalimba tines (modal synthesis), a plucked harp-lute (Karplus-Strong),
a clay-pot drum, water drops (bubble model), filtered air, a breathing drone and sparse glass shimmer.
Mastered through a frequency-dependent convolution reverb, tape warmth and mid/side width."""
import numpy as np
from scipy.signal import lfilter, fftconvolve, butter, sosfilt
SR = 48000
rng = np.random.RandomState(2026)

class Mix:
    def __init__(self, dur):
        self.N = int(dur*SR); self.dry = np.zeros((2, self.N)); self.send = np.zeros((2, self.N)); self.dur = dur
    def add(self, s, t0, g=1.0, pan=0.0, rev=.35):
        i = int(t0*SR); j = min(self.N, i+len(s))
        if j <= i or i < 0: return
        s = s[:j-i]*g; l, r = np.sqrt((1-pan)/2), np.sqrt((1+pan)/2)
        self.dry[0, i:j] += s*l*(1-rev*.5); self.dry[1, i:j] += s*r*(1-rev*.5)
        self.send[0, i:j] += s*l*rev; self.send[1, i:j] += s*r*rev

def hz(m): return 440*2**((m-69)/12)
def t_(n): return np.arange(n)/SR
def lp(x, fc, order=2): return sosfilt(butter(order, min(fc, SR*.45), 'low', fs=SR, output='sos'), x)
def hp(x, fc, order=2): return sosfilt(butter(order, fc, 'high', fs=SR, output='sos'), x)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)

# ---- instruments -------------------------------------------------------
def kalimba(m, vel=.5, dur=3.0):
    """Modal tine: fundamental plus inharmonic overtones (about 5.4x and 14.2x) that die fast; soft thumb attack."""
    n = int(dur*SR); t = t_(n); f = hz(m)
    s = np.sin(2*np.pi*f*t)*np.exp(-t/1.4) + .22*vel*np.sin(2*np.pi*f*5.4*t)*np.exp(-t/.12) + .05*vel*np.sin(2*np.pi*f*14.2*t)*np.exp(-t/.03)
    s += .04*np.sin(2*np.pi*f*2.0*t)*np.exp(-t/.5)                     # body buzz
    att = np.minimum(1, t/.006)
    return lp(s*att, 2600+1800*vel)*vel

def harplute(m, vel=.5, dur=3.5, bright=.5):
    """Karplus-Strong string with a soft, damped pluck (seperewa-like)."""
    f = hz(m); p = int(SR/f); n = int(dur*SR)
    buf = lp(rng.randn(p), 1500+3000*bright); out = np.zeros(n); dec = .996 - .002*(1-bright)
    y = np.zeros(n+p); y[:p] = buf
    for k in range(p, n+p): y[k] = dec*.5*(y[k-p] + y[k-p+1 if k-p+1 < k else k-p])
    out = y[p:]*np.minimum(1, t_(n)/.004)
    return lp(out, 3200)*vel*.8

def claypot(vel=.5, f0=92):
    """Udu-like clay pot: low resonant body with a soft pitch bend, no click."""
    n = int(1.2*SR); t = t_(n); f = f0*(1+.18*np.exp(-t*18))
    s = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4.5) + .3*np.sin(2*np.pi*np.cumsum(f*2.3)/SR)*np.exp(-t*9)
    return lp(s*np.minimum(1, t/.008), 900)*vel

def drop(vel=.4, f0=None):
    """Bubble model: a sine whose pitch rises as the bubble resonates, with a fast natural decay."""
    f0 = f0 or rng.uniform(700, 1300); n = int(.18*SR); t = t_(n)
    f = f0*(1 + 2.2*t*12); s = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*38)*np.minimum(1, t/.002)
    return lp(s, 3000)*vel

def air(dur, lo=300, hi=2400, vel=.3, sweep=.07):
    """Filtered breath: pink-ish noise through a slowly moving band."""
    n = int(dur*SR); w = rng.randn(n); pink = lfilter([0.049922035, -0.095993537, 0.050612699, -0.004408786], [1, -2.494956002, 2.017265875, -0.522189400], w)
    t = t_(n); out = np.zeros(n); seg = 4096
    for k in range(0, n, seg):
        c = np.exp(np.log(lo) + (np.log(hi)-np.log(lo))*(.5+.5*np.sin(2*np.pi*sweep*t[min(k, n-1)])))
        out[k:k+seg] = bp(pink[k:k+seg], c*.7, c*1.4)
    e = np.minimum(1, t/2.5)*np.minimum(1, (dur-t)/2.5)
    return out/np.abs(out).max()*e*vel

def drone(root, dur, vel=.25, breath=.12):
    """Two detuned saws, a sine sub and a slowly breathing low-pass; amplitude breathes at about 0.12 Hz."""
    n = int(dur*SR); t = t_(n); f = hz(root); s = np.zeros(n)
    for d in (-.06, .06):
        ph = (f*2**(d/12)*t) % 1; s += 2*ph-1
    s = s*.5 + .8*np.sin(2*np.pi*f/2*t)
    out = np.zeros(n); seg = 4096
    for k in range(0, n, seg):
        c = 260 + 220*(.5+.5*np.sin(2*np.pi*.05*t[min(k, n-1)]))
        out[k:k+seg] = lp(s[k:k+seg], c)
    e = np.minimum(1, t/3)*np.minimum(1, (dur-t)/3)*(1-breath+breath*np.sin(2*np.pi*.12*t))
    return out*e*vel

def pad(ms, dur, vel=.2, bright=900, att=2.0):
    n = int(dur*SR); t = t_(n); s = np.zeros(n)
    for m in ms:
        for d, ph in ((-.05, 0), (0, 1.3), (.05, 2.1)):
            s += np.sin(2*np.pi*hz(m)*2**(d/12)*t + ph) + .18*np.sin(2*np.pi*2*hz(m)*t)
    e = np.minimum(1, t/att)*np.minimum(1, (dur-t)/max(att, .5))
    return lp(s, bright)*e*vel/len(ms)

def glass(m, vel=.15, dur=4.0):
    """Sparse FM shimmer: a soft bell with slowly decaying modulation; futuristic but quiet."""
    n = int(dur*SR); t = t_(n); f = hz(m); I = 1.6*np.exp(-t/0.8)
    s = np.sin(2*np.pi*f*t + I*np.sin(2*np.pi*f*1.41*t))*np.exp(-t/1.8)*np.minimum(1, t/.03)
    return lp(s, 4000)*vel

def swell(ms, dur, vel=.2):
    n = int(dur*SR); t = t_(n); s = sum(np.sin(2*np.pi*hz(m)*t + i) for i, m in enumerate(ms))
    out = np.zeros(n); seg = 2048
    for k in range(0, n, seg):
        out[k:k+seg] = lp(s[k:k+seg], 600 + 2200*(t[min(k, n-1)]/dur)**2)
    return out*(t/dur)**2.4*vel/len(ms)

# ---- master ------------------------------------------------------------
def impulse(rt=3.4):
    """Stereo decorrelated noise IR with frequency-dependent decay (highs die first) and a short pre-delay."""
    n = int(rt*1.3*SR); t = t_(n); irs = []
    common = rng.randn(n)
    for ch in range(2):
        w = .6*common + .8*rng.randn(n)
        lo, mid, hi = lp(w, 400), bp(w, 400, 2500), hp(w, 2500)
        ir = lo*np.exp(-6.9*t/rt) + mid*np.exp(-6.9*t/(rt*.75)) + .5*hi*np.exp(-6.9*t/(rt*.35))
        ir[:int(.018*SR)] = 0; ir *= np.minimum(1, t/.06)
        irs.append(ir/np.sqrt((ir**2).sum()))
    return irs

def master(mx, lufs_note='normalised later with ffmpeg loudnorm to -20 LUFS, TP -3'):
    ir = impulse()
    wet = np.stack([fftconvolve(mx.send[c], ir[c])[:mx.N] for c in range(2)])
    mid, side = (wet[0]+wet[1])/2, (wet[0]-wet[1])/2; side *= .75; wet = np.stack([mid+side, mid-side])
    out = mx.dry + wet*.7
    out = np.stack([hp(lp(o, 9000, 1), 28) for o in out])
    out = np.tanh(out/np.abs(out).max()*1.2)/np.tanh(1.2)      # gentle tape warmth
    f = np.ones(mx.N); fi = int(.5*SR); fo = int(min(3.0, mx.dur*.25)*SR)
    f[:fi] = np.linspace(0, 1, fi)**2; f[-fo:] = np.linspace(1, 0, fo)**2
    return out*f*.8

def write(path, out):
    from scipy.io import wavfile
    wavfile.write(path, SR, (out.T*32767).astype(np.int16))

PENTA = [60, 62, 64, 67, 69, 72, 74, 76, 79, 81]

def ostinato(mx, t0, t1, base=PENTA, vel=.22, rev=.4, step=0.36, accent_every=3, root_pulse=True, pulse_every=4):
    """3-against-4 hypnotic figure: a 3-note kalimba cell over a clay-pot pulse every 4 steps."""
    cell = [base[2], base[4], base[6]]; k = 0; tt = t0
    while tt < t1 - .05:
        m = cell[k % 3] + (12 if (k // 12) % 2 else 0)*0
        v = vel*(1.15 if k % accent_every == 0 else .85)
        mx.add(kalimba(m, v, 2.4), tt, 1, -.5 + (k % 5)*.25, rev)
        if root_pulse and k % pulse_every == 0: mx.add(claypot(.35), tt, .55, 0, .25)
        tt += step; k += 1
