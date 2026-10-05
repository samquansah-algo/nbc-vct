# NBC motion

## Brand film (30 s): Apple-style, on the NBC brand system

[![Brand film poster](NBC_Brand_Film_poster.png)](NBC_Brand_Film_16x9.mp4)

**[NBC_Brand_Film_16x9.mp4](NBC_Brand_Film_16x9.mp4)** (1920 × 1080) · **[NBC_Brand_Film_9x16.mp4](NBC_Brand_Film_9x16.mp4)** (1080 × 1920) · 30 seconds · 30 fps · −20 LUFS

**Design rules:**
- one idea per shot;
- full-bleed colour chapters in which each colour does its brand job;
- Unbounded capitals, a few words per frame;
- piece-shaped wipes between chapters;
- cuts on a 96 BPM grid;
- the last pieces become the logo.

| Time | Colour | On screen |
|---|---|---|
| 0:00 | Ink | "AI makes answers cheap." |
| 0:03 | Yellow (experience) | "Investigate." "Build." A ramp is built; the car stops short |
| 0:09 | Orange (the child's action) | "Get it wrong." "Try again." One block higher; the car goes farther |
| 0:14 | Blue (intelligence) | "Shared AI. You decide." A suggestion, confirmed by a tap |
| 0:19 | Violet (evidence) | "Changed one thing." Predicted first · one change · explained why |
| 0:21 | Green (capability) | "It holds." The same idea in a second world |
| 0:23 | Ink | Five pieces become the symbol; the wordmark rises; "Partner with us."; "A venture by Algo Peers" |

**Sound:** material sounds lead, with the score beneath:
- **materials:** wood-block taps as the ramp is built, wheels rolling on wood, a clay-pot landing, a water-drop tap, and a filtered-air rush on each wipe;
- **score:** kalimba and harp-lute ([`NBC_brand_scores.py`](NBC_brand_scores.py)), built on the shared [sound engine](NBC_sound_engine.py).


## NBC Story (first cut)

[![NBC Story poster](NBC_Story_poster.png)](NBC_Story.mp4)

**[NBC_Story.mp4](NBC_Story.mp4)** · 62 seconds · 1920 × 1080 · 30 fps · original score, softened and remastered to −21 LUFS

The elevator pitch, told in nine scenes in the [NBC brand](../NBC_Brand_Guide.pdf):

| Time | Scene |
|---|---|
| 0:00 | A single piece drops into place. "AI makes answers cheap." |
| 0:05 | Answers flood the screen, then fade to grey. "Answers are everywhere." |
| 0:09 | For children, the chance to investigate, build, get it wrong and try again "is still costly." |
| 0:16 | A car rolls down a ramp and stops short. Change one thing (the ramp height), and it rolls farther. "Then explain why." |
| 0:24 | Pieces assemble into a grid and light up. "NBC builds programmable physical learning environments…" |
| 0:31 | Experience + intelligence + evidence → capability. "Turn intelligence into capability." |
| 0:38 | For programme owners: the kit, the facilitator card, the assistant and the evidence summary. "Hands-on learning, ready to run." |
| 0:45 | Cape Coast, Ghana: 5 years of practice and 1,000+ children with Algo Peers. Then pieces spread outward. "For the next billion." |
| 0:51 | The pieces become one piece, and the logo reveals. "Learning infrastructure for the next billion children." Contact details follow. |

**Notes:**
- The ramp distances (142 cm and 187 cm) are illustrative.
- The 5 years and 1,000+ children are Algo Peers figures.
- [`NBC_Story_source.html`](NBC_Story_source.html) is the animation source. Each frame is rendered at an exact time and encoded to MP4.
- **Score:** see **Sound** below.

## Teaser for WhatsApp and Instagram status (brand system)

**[NBC_Teaser_1080x1920.mp4](NBC_Teaser_1080x1920.mp4)** · 12 seconds · 1080 × 1920 (9:16) · under 1 MB · −20 LUFS

It is abstract by design and says nothing about what NBC builds:
- one word per colour field, revealed by piece-shaped wipes: "Something" (ink), "is" (yellow), "taking" (orange), "shape." (blue);
- five white pieces (violet);
- the pieces become the logo, with "Coming soon." and "A venture by Algo Peers".

![Teaser poster](NBC_Teaser_poster.png)

## Sound

All three films share one original sound world: natural, hypnotic and quietly futuristic. It is built entirely from physical models in code ([`NBC_sound_engine.py`](NBC_sound_engine.py), cue sheets in [`NBC_scores.py`](NBC_scores.py)). There are no samples and no licensed audio, so NBC owns it outright.

| Element | How it is made | Its role |
|---|---|---|
| Kalimba tines | Modal synthesis (a fundamental plus fast-fading inharmonic overtones), tuned pentatonic | The voice: a quiet nod to West African thumb pianos |
| Harp-lute strings | Karplus-Strong plucked string, in the spirit of Ghana's seperewa | Reflective phrases; a muted string on "get it wrong" |
| Clay-pot drum | A low resonant body with a soft pitch bend | Pulse without a click |
| Water drops | Bubble model (a sine whose pitch rises as it resonates) | Interface taps, landing cards, the "next billion" sparkle |
| Air | Filtered pink noise through a slowly moving band | Breath, space, the car rolling |
| Drone | Detuned waves, a sine sub and a slow-moving low-pass, breathing at about 0.12 Hz | The hypnotic bed |
| Glass | Soft FM shimmer, used sparingly | The future, very quietly |

- **Hypnotic structure:** a three-note kalimba cell against a clay-pot pulse every four steps (3 against 4), over the breathing drone.
- **Space:** a convolution reverb whose highs decay faster than its lows, like a real room.
- **Mastering:**
  - gentle tape warmth, controlled stereo width, and a soft top end, with almost no energy in the harsh 2–5 kHz band;
  - −20 LUFS integrated, peaks around −9 dBFS;
  - mono-safe for phone speakers (left/right correlation 0.8–0.9, under 0.5 dB lost when summed to mono).
