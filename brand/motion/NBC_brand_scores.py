"""Scores for the brand-system films. The material sounds lead (wood, wheels, card, clay, water); the kalimba and harp-lute score sits beneath.
96 BPM grid; every cut and on-screen event has a cue."""
import sys
from sound3 import *

def wood(vel=.4, f0=None):
    """Wood block: modal partials (1, 2.76, 5.4) with fast damping and a soft mallet."""
    f0 = f0 or rng.uniform(520, 680); n = int(.35*SR); t = t_(n)
    s = np.sin(2*np.pi*f0*t)*np.exp(-t*28) + .45*np.sin(2*np.pi*f0*2.76*t)*np.exp(-t*55) + .15*np.sin(2*np.pi*f0*5.4*t)*np.exp(-t*90)
    return lp(s*np.minimum(1, t/.0025), 3500)*vel
def roll(dur, vel=.25):
    """Small wheels on wood: band-limited rumble plus faint seam ticks."""
    n = int(dur*SR); t = t_(n); s = bp(rng.randn(n), 90, 520)
    ticks = np.zeros(n); k = 0
    while k < n: ticks[k:k+60] += np.hanning(60)*.6; k += int(SR*rng.uniform(.07, .11))
    e = np.sin(np.pi*np.clip(t/dur, 0, 1))**.8
    return lp(s/np.abs(s).max()*.7 + lp(ticks, 1500)*.4, 1800)*e*vel
def whoosh(dur=.45, vel=.18):
    """The piece wipe: filtered air rising, felt more than heard."""
    n = int(dur*SR); t = t_(n); w = rng.randn(n); out = np.zeros(n); seg = 1024
    for k in range(0, n, seg):
        c = 300 + 2500*(t[min(k, n-1)]/dur)**2; out[k:k+seg] = bp(w[k:k+seg], c*.6, c*1.5)
    return out/np.abs(out).max()*(t/dur)**1.6*np.minimum(1, (dur-t)/.03)*vel

def bed(mx, t0, t1, base, vel=.13, step=.3125):
    ostinato(mx, t0, t1, base=base, vel=vel, step=step, pulse_every=4)

def film():
    mx = Mix(30.0)
    mx.add(drone(36, 30, .12), 0, 1, 0, .3); mx.add(air(30, 250, 2000, .07), 0, 1, 0, .6)
    # cold open, ink: three words, three tines
    for i, m in enumerate([64, 67, 72]): mx.add(kalimba(m, .32, 3), .25+i*.32, 1, -.3+.3*i, .5)
    mx.add(pad([48, 55, 60, 64], 3.0, .09, 700, .4), 0, 1, 0, .5)
    for b in [3.1, 9.0, 14.0, 19.0, 21.4, 23.4]: mx.add(whoosh(), b-.45, 1, 0, .3)
    # yellow · investigate, build: the ramp is built, the car rolls and stops short
    bed(mx, 3.1, 9.0, PENTA)
    for i in range(3): mx.add(wood(.35), 3.2+i*.18, 1, .2, .3)
    mx.add(kalimba(76, .28), 3.12, 1, -.3, .5); mx.add(kalimba(79, .28), 5.55, 1, .3, .5)
    mx.add(roll(1.3, .22), 7.0, 1, .2, .25); mx.add(wood(.28, 420), 8.3, 1, .25, .3)
    # orange · get it wrong, try again: a block raises the ramp, the car goes farther
    mx.add(harplute(59, .3, bright=.3), 9.02, 1, 0, .45)
    mx.add(wood(.4, 600), 10.9, 1, -.2, .3); mx.add(wood(.3, 640), 11.05, 1, -.2, .3)
    mx.add(roll(1.4, .24), 11.9, 1, .3, .25); mx.add(kalimba(81, .3), 11.8, 1, .3, .5); mx.add(glass(84, .06), 13.3, 1, .3, .7)
    bed(mx, 11.8, 14.0, PENTA, .11)
    # blue · shared AI: the phone rises, a tap, a confirmation
    mx.add(pad([45, 52, 57, 64], 5, .09, 900), 14, 1, 0, .5)
    mx.add(air(.8, 400, 2000, .07, .5), 14.4, 1, 0, .3); mx.add(drop(.16, 850), 16.4, 1, .2, .4); mx.add(glass(88, .06), 16.7, 1, .2, .7)
    mx.add(kalimba(72, .26), 14.02, 1, -.2, .5); mx.add(kalimba(76, .24), 17.2, 1, .2, .5)
    # violet · changed one thing: three chips, three tines
    for i in range(3): mx.add(kalimba([72, 74, 76][i], .24, 2), 19.9+i*.22, 1, -.2+.2*i, .5)
    mx.add(pad([41, 48, 57, 64], 2.4, .09, 900), 19, 1, 0, .5)
    # green · it holds: two worlds, one idea
    mx.add(kalimba(79, .28), 22.0, 1, -.3, .55); mx.add(kalimba(84, .28), 22.4, 1, .3, .55)
    mx.add(pad([48, 55, 60, 67], 2.0, .09, 1000), 21.4, 1, 0, .5)
    # ink · the end card: converge, symbol, wordmark, line, ask, endorsement
    e0 = 23.4
    for i in range(5): mx.add(wood(.16, 520+i*60), e0+i*.06, 1, -.4+.2*i, .4)
    mx.add(swell([60, 64, 67, 72], .9, .16), e0+.25, 1, 0, .6)
    mx.add(claypot(.35, 66), e0+1.1, .55, 0, .4)
    mx.add(pad([36, 48, 55, 60, 64, 67, 72], 6.4, .13, 1200, .8), e0+1.05, 1, 0, .65)
    for i, m in enumerate([67, 72, 76]): mx.add(kalimba(m, .24, 3), e0+1.5+i*.16, 1, -.2+.2*i, .6)
    mx.add(harplute(72, .22), e0+2.4, 1, -.2, .6); mx.add(harplute(76, .24), e0+3.1, 1, .2, .6)
    mx.add(wood(.18, 560), e0+3.8, 1, 0, .5)
    return mx

def teaser():
    mx = Mix(12.0)
    mx.add(drone(36, 12, .12), 0, 1, 0, .3); mx.add(air(12, 250, 2000, .07), 0, 1, 0, .6)
    for tt, m in [(.15, 64), (1.92, 67), (3.12, 72), (4.32, 76)]: mx.add(kalimba(m, .32, 2.6), tt, 1, 0, .5); mx.add(wood(.18), tt, 1, .2, .3)
    for b in [1.9, 3.1, 4.3, 5.5, 6.7]: mx.add(whoosh(), b-.45, 1, 0, .3)
    bed(mx, 1.9, 6.7, PENTA, .10)
    for i in range(5): mx.add(drop(.12, 800+i*100), 5.6+i*.1, 1, -.4+.2*i, .45)
    e0 = 6.7
    for i in range(5): mx.add(wood(.16, 520+i*60), e0+i*.06, 1, -.4+.2*i, .4)
    mx.add(swell([60, 64, 67, 72], .9, .16), e0+.25, 1, 0, .6)
    mx.add(claypot(.35, 66), e0+1.1, .55, 0, .4)
    mx.add(pad([36, 48, 55, 60, 64, 67, 72], 4.3, .13, 1200, .8), e0+1.05, 1, 0, .65)
    for i, m in enumerate([67, 72, 76]): mx.add(kalimba(m, .24, 3), e0+1.5+i*.16, 1, -.2+.2*i, .6)
    mx.add(harplute(76, .24), e0+3.1, 1, .2, .6); mx.add(wood(.18, 560), e0+3.8, 1, 0, .5)
    return mx

for name, fn in [('film', film), ('teaser', teaser)]:
    write(f'score_brand_{name}.wav', master(fn())); print(name, 'ok')
