import sys
from sound3 import *

def launch():
    mx = Mix(86.0)
    # bed: air and a breathing drone across the whole film (C, then A, F, C)
    mx.add(air(86, 250, 2200, .10), 0, 1, 0, .6)
    for t0, t1, r in [(0, 26, 36), (26, 40, 33), (40, 59, 36), (59, 77, 29), (77, 86, 36)]:
        mx.add(drone(r, t1-t0+3, .16), t0, 1, 0, .3)
    # 1 · stillness: a single tine and a drop as the piece appears
    mx.add(kalimba(76, .35, 4), .1, 1, .1, .55); mx.add(drop(.18, 900), .12, 1, .2, .5)
    for i, m in enumerate([67, 72, 76]): mx.add(kalimba(m, .28, 3), .6+i*.42, 1, -.3+.3*i, .55)
    mx.add(pad([48, 55, 62, 64], 7.5, .10, 700), 0, 1, 0, .5)
    # 2 · "learning isn't the answer"
    mx.add(pad([45, 52, 59, 64], 7.5, .10, 700), 7, 1, 0, .5)
    mx.add(harplute(69, .35), 7.6, 1, -.2, .5); mx.add(harplute(64, .3), 9.6, 1, .2, .5); mx.add(harplute(57, .3), 10.4, 1, 0, .5)
    # 3 · the loop: the hypnotic 3-against-4 figure enters with the ramp
    ostinato(mx, 14.6, 26.0, vel=.20, step=.36)
    mx.add(pad([48, 55, 60, 64], 12, .09, 800), 14, 1, 0, .5)
    for tt, m in [(15.2, 79), (17.6, 81), (22.0, 84)]: mx.add(glass(m, .07), tt, 1, .3, .7)
    mx.add(air(2.0, 600, 3000, .10, .4), 16.6, 1, -.3, .3); mx.add(air(2.4, 600, 3000, .10, .4), 21.0, 1, .3, .3)   # the car rolls
    mx.add(harplute(59, .32, bright=.3), 19.6, 1, 0, .5)                                                             # get it wrong: a muted low string
    # 4 · reflective: strip back to drone, air and one string
    mx.add(pad([45, 52, 57, 64], 6.5, .09, 650), 26, 1, 0, .55); mx.add(harplute(64, .3), 26.8, 1, .1, .55); mx.add(harplute(60, .26), 28.4, 1, -.1, .55)
    # 5 · Introducing: a long swell into a bloom
    mx.add(swell([60, 64, 67, 72, 76], 2.2, .22), 31.2, 1, 0, .6)
    mx.add(claypot(.4, 70), 33.2, .7, 0, .4)
    mx.add(pad([41, 53, 57, 60, 64, 69], 7.0, .16, 1300, 1.2), 33.2, 1, 0, .6)
    for i, m in enumerate([65, 69, 72, 76, 81]): mx.add(kalimba(m, .26, 3.5), 33.2+i*.11, 1, -.4+.2*i, .6)
    mx.add(glass(88, .06, 5), 35.4, 1, .3, .8)
    # 6 · the kit: ostinato returns, brighter, cards land as drops
    ostinato(mx, 40.2, 49.0, base=[62, 64, 67, 69, 72, 74, 76, 79, 81, 84], vel=.18, step=.36)
    mx.add(pad([48, 55, 60, 67], 9, .09, 1000), 40, 1, 0, .5)
    for i in range(4): mx.add(drop(.16, 800+i*120), 40.6+i*.45, 1, -.45+.3*i, .5)
    # 7 · the assistant: calm, one tap, one confirmation
    mx.add(pad([41, 48, 57, 64], 10, .10, 850), 49, 1, 0, .55)
    for i, m in enumerate([65, 69, 72, 76]): mx.add(harplute(m, .26), 49.6+i*.95, 1, -.2+.13*i, .55)
    mx.add(drop(.12, 950), 51.3, 1, .2, .5); mx.add(drop(.22, 760), 53.9, 1, 0, .5)
    mx.add(glass(84, .08), 54.3, 1, .2, .7); mx.add(glass(88, .05), 54.45, 1, -.2, .7)
    # 8 · evidence: four rows, four tines
    mx.add(pad([48, 55, 60, 64], 8.5, .09, 850), 59, 1, 0, .55)
    for i in range(4): mx.add(kalimba([72, 74, 76, 79][i], .22, 2.5), 60.4+i*.6, 1, .25, .5)
    # 9 · place, then the next billion: hypnotic figure widens and lifts
    mx.add(pad([45, 52, 57, 60], 5.5, .10, 800), 67, 1, 0, .55)
    mx.add(harplute(69, .3), 67.6, 1, 0, .5); mx.add(harplute(64, .26), 69.0, 1, 0, .5)
    mx.add(swell([55, 60, 64, 67, 72], 2.8, .2), 70.4, 1, 0, .6)
    ostinato(mx, 72.2, 77.0, base=[67, 69, 72, 74, 76, 79, 81, 84, 86, 88], vel=.16, step=.24, root_pulse=False)
    for k in range(18): mx.add(drop(.06), 72.2+rng.rand()*2.8, 1, rng.uniform(-.9, .9), .7)
    mx.add(pad([43, 50, 55, 59, 62, 67], 5, .13, 1500), 72.2, 1, 0, .6)
    # 10 · resolve on the logo
    mx.add(claypot(.35, 65), 78.0, .6, 0, .4)
    mx.add(pad([36, 48, 55, 60, 64, 67, 72], 8, .16, 1200, 1.5), 78, 1, 0, .65)
    for i, m in enumerate([60, 64, 67, 72, 76]): mx.add(kalimba(m, .25, 4.5), 78+i*.14, 1, -.4+.2*i, .65)
    mx.add(glass(84, .06, 6), 79.6, 1, .2, .85); mx.add(harplute(72, .24), 80.6, 1, -.2, .7); mx.add(harplute(76, .2), 82.3, 1, .2, .7)
    return mx

def teaser():
    mx = Mix(9.5)
    mx.add(air(9.5, 300, 2400, .10), 0, 1, 0, .6); mx.add(drone(36, 9.5, .14), 0, 1, 0, .3)
    order_t = [0.12] + [1.0+k*.2 for k in range(1, 9)]; notes = [72, 76, 79, 74, 81, 77, 84, 79, 88]
    for tt, m in zip(order_t, notes): mx.add(kalimba(m-12, .26, 2.6), tt, 1, (m % 5-2)*.22, .55)
    mx.add(drop(.14, 880), .14, 1, 0, .5)
    mx.add(air(1.0, 800, 3500, .10, .6), 2.9, 1, .3, .3)                       # the turn
    mx.add(swell([60, 64, 67, 72], 1.0, .18), 3.2, 1, 0, .6)
    mx.add(pad([53, 57, 60, 64], 2.2, .12, 1000, .5), 4.2, 1, 0, .6)
    mx.add(drop(.18, 760), 6.25, 1, 0, .5); mx.add(glass(84, .07, 3.5), 6.3, 1, .2, .8)
    mx.add(claypot(.3, 68), 6.3, .5, 0, .4)
    mx.add(pad([36, 48, 55, 60, 64, 67], 3.2, .14, 1100, .7), 6.3, 1, 0, .65)
    for i, m in enumerate([60, 64, 67, 72]): mx.add(kalimba(m, .22, 3), 6.3+i*.13, 1, -.3+.2*i, .6)
    mx.add(harplute(76, .2), 7.4, 1, .2, .7)
    return mx

def story():
    """First cut (62 s): same palette, mapped to the original scene times."""
    mx = Mix(62.0)
    mx.add(air(62, 250, 2200, .10), 0, 1, 0, .6)
    for t0, t1, r in [(0, 16.2, 33), (16.2, 31.4, 36), (31.4, 44.6, 41), (44.6, 51.4, 33), (51.4, 62, 36)]: mx.add(drone(r, t1-t0+3, .15), t0, 1, 0, .3)
    mx.add(kalimba(76, .35, 4), 1.2, 1, 0, .55); mx.add(drop(.2, 700), 1.18, 1, 0, .5)
    for i, m in enumerate([67, 72, 76, 79, 84]): mx.add(kalimba(m, .22, 2.6), 1.5+i*.22, 1, -.4+.2*i, .55)
    for k in range(20): mx.add(drop(.05), 4.8+rng.rand()*1.8, 1, rng.uniform(-.9, .9), .6)
    mx.add(pad([45, 52, 59, 64], 4.6, .1, 800), 4.6, 1, 0, .5)
    for i, (tt, m) in enumerate([(10.0, 72), (10.7, 76), (11.4, 71), (12.1, 79)]): mx.add(harplute(m, .3, bright=.3 if i == 2 else .5), tt, 1, -.4+.27*i, .5)
    ostinato(mx, 16.3, 24.3, vel=.2)
    mx.add(air(1.6, 600, 3000, .1, .4), 16.9, 1, -.3, .3); mx.add(air(1.9, 600, 3000, .1, .4), 20.6, 1, .3, .3)
    for i in range(16): mx.add(kalimba([72, 74, 76, 79, 81, 84, 86, 88][i % 8], .14, 1.8), 27.6+i*.16, 1, -.6+(i % 4)*.4, .55)
    mx.add(pad([48, 55, 60, 64], 7, .1, 900), 24.4, 1, 0, .5)
    for tt, m in [(31.8, 60), (32.5, 64), (33.2, 67)]: mx.add(harplute(m, .3), tt, 1, 0, .5)
    mx.add(swell([60, 64, 67, 72], .7, .16), 33.5, 1, 0, .6)
    for i, m in enumerate([72, 76, 79, 84]): mx.add(kalimba(m, .22, 3), 34.1+i*.1, 1, -.3+.2*i, .6)
    ostinato(mx, 37.8, 44.4, base=[62, 64, 67, 69, 72, 74, 76, 79, 81, 84], vel=.17)
    for i in range(4): mx.add(drop(.14, 800+i*120), 39.2+i*.35, 1, -.45+.3*i, .5)
    mx.add(pad([45, 52, 57, 64], 6.8, .11, 900), 44.6, 1, 0, .55)
    mx.add(swell([55, 60, 64, 67, 72], 2.6, .2), 47.6, 1, 0, .6)
    for k in range(24): mx.add(drop(.05), 48.2+rng.rand()*1.8, 1, rng.uniform(-.9, .9), .7)
    mx.add(claypot(.35, 65), 53.4, .6, 0, .4); mx.add(pad([36, 48, 55, 60, 64, 67, 72], 7.5, .16, 1200, 1.2), 53.4, 1, 0, .65)
    for i, m in enumerate([60, 64, 67, 72, 76]): mx.add(kalimba(m, .25, 4), 53.4+i*.14, 1, -.4+.2*i, .65)
    mx.add(glass(84, .06, 5), 54.6, 1, .2, .85)
    return mx

for name, fn in [('launch', launch), ('teaser', teaser), ('story', story)]:
    if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
    write(f'score3_{name}.wav', master(fn())); print(name, 'ok')
