# Dila's Birthday Site — Plan

**Deadline:** Saturday, Oct 31, 2026 (she turns 25). Send the link on the morning of the 31st, her local time.
**Today:** Monday, Oct 26 → **5 days**, so scope stays small and the critical path is collecting friends' wishes.
**Audience:** one person, on an iPhone (Safari), possibly on roaming data.

## The experience

1. **Lock screen** — an iPhone-style passcode screen. 6 dots, custom on-screen keypad, passcode `311001`. Wrong code = shake + a cute message. Right code = unlock animation.
2. **Calendar reveal** — a calendar event/notification animates in: _"Saturday, October 31 — It's your birthday 🎂"_.
3. **Surprise / hero** — her face cutouts rain down in the background; a hero section about her (name, "25", a short sweet line).
4. **Wishes** — scroll down to cards from friends, each with a photo and a name. The card face shows a short teaser of the message; tapping it flips/expands the card to show the full message.
5. **Pop the faces** — the raining face cutouts are tappable. A tap pops one with a little confetti burst. No counter, no score: it's just a small joy.
6. **Finish-line run** — she runs, so the wishes section is a run: a little runner follows your scroll along a track, and the end is a finish line + medal.

## Tech decisions

| Area      | Choice                                | Why                                                       |
| --------- | ------------------------------------- | --------------------------------------------------------- |
| Build     | Vite + React + TypeScript             | Fast dev loop, static output, the stack you wanted to try |
| Animation | Framer Motion                         | Springs, gestures, layout animation, scroll-linked values |
| Styling   | Plain CSS modules (or one CSS file)   | Nothing to learn; the site is small                       |
| Content   | `src/content/wishes.ts` (typed array) | Adding a friend's card = adding one object                |
| Images    | Resized to ~800px WebP before commit  | Fast on roaming data; keep total media under ~5 MB        |
| Hosting   | Cloudflare Pages (fallback: Netlify)  | Free, fast globally, free `*.pages.dev` URL               |
| Domain    | Free URL for now                      | Revisit only if there's time left                         |

### iPhone / Safari gotchas to design around

- Use `100dvh`, not `100vh` (the URL bar changes the height).
- Don't use a native `<input>` for the passcode: it pops the system keyboard. Use a custom keypad.
- iOS Safari has no `navigator.vibrate`, so use visual feedback only (shake, dot pulse).
- Audio can't autoplay. If we add music, it starts on the first tap (the passcode taps are a natural trigger).
- Respect `env(safe-area-inset-*)` for the notch and home indicator.
- Keep falling-face counts modest (about 15–25 elements) so scrolling stays smooth.
- Add `noindex` and an Open Graph image/title so the WhatsApp/iMessage preview looks cute.

## Schedule

| Day                | Goal                                                                                                  | Done when                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Mon 26 (today)** | Message friends (see below). Scaffold the project. Deploy a "hello world". Build the passcode screen. | A live URL opens on your iPhone; the passcode screen works |
| **Tue 27**         | Calendar reveal animation. Face cutouts raining. Hero section.                                        | Full flow lock → calendar → hero works                     |
| **Wed 28**         | Wish cards with tap-to-expand (placeholder data). Scroll layout. Pop-the-faces.                       | Whole page works end to end with fake content              |
| **Thu 29**         | Drop in real wishes/photos as they arrive. Running track/medal. Music (optional). Copy polish.        | Real content in; nothing placeholder remains               |
| **Fri 30**         | Test on a real iPhone (Safari, plus mobile data). Fix layout and perf. Final deploy.                  | You've cleared the whole flow twice on the phone           |
| **Sat 31**         | Send the link on her morning.                                                                         | 🎉                                                         |

Anything left over after Friday is a nice-to-have, not a deadline problem.

## Critical path: collecting friends' wishes

Everything else is in our control; this isn't. **Ask today**, with a hard cutoff of **Thu Oct 29 evening**.

Ask each friend for:

- a short wish (1–3 sentences),
- a photo (ideally of them, or of them with her),
- how they want their name shown.

Tell them to keep it secret. Cards with no photo fall back to an initial/emoji avatar, so a late or missing photo never blocks the build.

## Assets checklist

- [ ] 4–8 cutouts of her face as transparent PNGs, with varied expressions and tilt. On iPhone: Photos → long-press the subject → _Copy_ → paste into Preview → export as PNG. Otherwise use a background-removal tool.
- [ ] Hero photo (optional, can reuse a cutout)
- [ ] Friends' wishes + photos (see above)
- [ ] A song (optional) — a short loop or one favorite
- [ ] Her name/nickname as it should appear on the site
- [ ] An Open Graph preview image (1200×630)

## Open decision: interactivity

Pick one, or two small ones. These are ordered by effort vs. charm:

1. **Pop the faces** (cheapest): the raining faces are tappable. Each tap pops one with a little confetti and a counter ticks up. At 25, something special happens. It reuses the rain you're already building.
2. **Finish-line run** (cheap, fits her): scroll-linked runner on a track through the wishes, ending with a medal and "25/25 🏅".
3. **Wish cards flip** (cheap): each friend's card flips to reveal a second line or a bigger photo.
4. **Blow out the candles** (medium): tap the candles on a cake; the last one triggers confetti. Microphone blowing is cool but risky on Safari, so tap-only.
5. **Mini quiz about the two of you** (more content work): 3–5 questions with cute wrong-answer reactions. This needs your writing time, so only if Thu has room.

Suggested default: **1 + 2**, which fit the theme and share assets with what we're already building.

## Risks

| Risk                                          | Mitigation                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| Friends reply late                            | Hard cutoff; avatar fallback; the site works with just 2–3 cards                 |
| Safari quirks surprise us late                | Deploy and test on a real iPhone from day 1, not Friday                          |
| Too many animated elements janks on her phone | Cap the rain, animate only `transform`/`opacity`                                 |
| Link leaks or gets indexed                    | Unguessable-enough URL, `noindex`, the passcode gate                             |
| She guesses the passcode early                | That's fine — it only opens the surprise, and you control when you send the link |
| Scope creep                                   | Anything not in "The experience" waits until the core flow is done               |

## Out of scope

Custom domain, CMS, backend, user accounts, analytics, multiple languages. Revisit only if there's spare time.
