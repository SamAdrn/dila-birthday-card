# Dila's Birthday Site — Plan

**Deadline:** Saturday, Oct 31, 2026 (she turns 25). Send the link on the morning of the 31st, her local time.
**Status:** Tue Oct 27 (late). Lock screen, persistent notch, and the birthday prompt (reworked and signed off: it now ends on the "24 years ago" beat with a Continue button) are done, plus a first cut of the Segue ("and now…"). **Next: the hero + message cards.** The extra growing-up photos come after. **4 days left.**
**Audience:** one person, on an iPhone (Safari), possibly on roaming data.

## The experience

1. **Lock screen** ✅ — an iPhone-style passcode screen. 6 dots, custom on-screen keypad, passcode `311001`. Wrong code = shake. Right code = unlock transition.
2. **Birthday prompt** ✅ — an iOS-style permission modal ("Allow 'Birthday Celebration' to use your whole day?"). Tapping **Allow** starts a slow sequence: a 1s beat of stillness, the background fades to a deep mist, the modal drops and fades (the baby photo stays), _"24 years ago"_ fades in under the photo, and a few seconds later a **Continue** button appears. This tap is also the user gesture that can start music (iOS blocks autoplay).
3. **Segue** 🟡 (first cut done) — the prompt's last frame (baby photo, _"24 years ago"_, Continue button) is the first beat; **she taps Continue** and it fades into the next beats (_"20 years ago"_, _"10 years ago"_, … with a photo each), ending on _"and now…"_ and a slow fade into the hero. Built so far: the first beat and _"and now…"_. The in-between beats and photos are still to do.
4. **Hero** — a big **HAPPY BIRTHDAY**, a hero photo of her, party-popper emojis, "25".
5. **Wishes** — under the hero, an **auto-scrolling** view of the friends' messages (photo, name, teaser). Tapping a card pauses the scroll and expands it to the full message; closing resumes.
6. **Stretch / bonus** — face rain with tap-to-pop confetti behind the hero, and music (an _Interstellar_-style swell from a royalty-free track).

## Progress log

### Done

- **Project:** Vite + React + TypeScript scaffold, Tailwind v4 (via `@tailwindcss/vite`), Framer Motion. Builds and lints clean.
- **Hosting:** Cloudflare Pages is set up. _Still to confirm: latest code is pushed and the live URL opens on an iPhone._
- **Friend forms:** Google Forms drafted in English and Indonesian (name, short title message, long message; photos requested privately by message, not through the form because file upload forces a Google sign-in). _Still to confirm: both are sent, with a Thu Oct 29 cutoff._
- **Layout shell (`App.tsx`):** outer full-height wrapper with the `bg-mist-900` "wallpaper" and a centered `max-w-md` column, so desktop shows a phone-width column. `stage` state (`'lock' | 'prompt' | 'segue' | 'main'`) decides which screen shows.
- **Lock screen (`Lock.tsx`):**
    - Keypad with digits + letters (2 = ABC … 9 = WXYZ), centered `0`, iOS-style Cancel/Delete in the footer.
    - Pointer cursor, hover and pressed states on keys.
    - No page scroll: root is `h-dvh overflow-hidden`; keys and gaps scale from `dvh` so short phones still fit.
    - Entrance animation: header fades in; keys spring in with a short stagger and a rise from below (variants + `staggerChildren`).
    - Wrong code: dots shake, then clear (`useAnimationControls`).
    - Correct code: short pause, then `onUnlock`.
- **Unlock transition:** `AnimatePresence` in `App.tsx`; the lock zooms/fades out and the next screen eases in.
- **Persistent notch (`Notch.tsx`):** a `fixed` pill at the top of the viewport, rendered in `App` outside `AnimatePresence` so it survives every transition. `pointer-events-none`, `z-50`, centered with `inset-x-0` + `flex justify-center` (no Tailwind transform, so it doesn't clash with Framer). It stays fixed on scroll.
- **Open-lock moment:** `App` owns an `unlocked` flag and passes it to `Notch`. On the correct code `Lock` calls `onUnlock` immediately; `App.handleUnlock` sets `unlocked`, then switches to `prompt` after 700ms. The shackle is its own `motion.path` (rotates open around its bottom-right via `transformBox: 'fill-box'`), then the whole icon fades out with a 0.4s delay.
- **Notch clearance:** `--spacing-notch` is defined in `@theme` in `index.css` (currently `8rem`, one number to tune). Each screen puts `pt-notch` on its own root, alongside its background and `h-dvh` / `min-h-dvh`, so backgrounds fill the full column and only the content sits below the notch.

- **Birthday prompt (`BirthdayPrompt.tsx`):** replaces the "calendar reveal". The white card is its own absolutely positioned layer (`bg-white/90 backdrop-blur-xl`), a sibling of the content, so it can fade on its own. One `leaving` flag on the parent drives `hidden` / `show` / `leave` variants. The leave sequence is a set of constants at the top of the file, all in seconds after the Allow tap:
    - `BG_DELAY_S` (1): a beat of stillness, then the root's background goes from clear to `rgb(14, 18, 20)` over `BG_FADE_S` (1.5s, ease-in-out). That color is `mist-900` (`rgb(22, 27, 29)`) a little darker; `mist-950` was too dark.
    - `MODAL_DELAY_S` (0.25, counted from when the background fade starts): the card and every piece except the photo drop `MODAL_DROP_PX` (24px) and fade over `MODAL_FADE_S` (0.5s, ease-in), all at once.
    - `YEARS_DELAY_S` (right after the modal is gone, 1.75s): _"24 years ago"_ fades in under the photo over 1.5s.
    - `CONTINUE_DELAY_S` (`YEARS_DELAY_S` + 3s): a **Continue** button fades in at the bottom; tapping it calls `onContinue`. It is unclickable until its fade completes.
      The Allow button is disabled while leaving.
- **Baby photo (`BabyPhoto.tsx`):** a plain motion div (grey placeholder). `borderRadius` is in `style` so Framer can correct it if it ever resizes. In the prompt it uses `photoVariants`, whose `leave` is `{ opacity: 1, y: 0 }` so it holds still while the rest fades.
- **Photo year (`src/content/years.ts`):** `BABY_PHOTO_YEAR` (2002) and `yearsAgo(year)`, used by both the prompt and the Segue, so the number is computed, never typed.
- **Segue (`Segue.tsx`):** the stage after the prompt. The prompt's end state _is_ the first beat (photo, _"24 years ago"_, Continue), so the Segue starts after it. Its background is `rgb(14, 18, 20)`, the same color the prompt fades to, so there's no seam. Today it only holds _"and now…"_ (it fades in after `NOW_DELAY_S` (0.8s), the time `App` gives the prompt to fade out), held for `NOW_HOLD_MS` (3s), then `onDone` fades to `main` over 1.2s. `App`'s prompt wrapper now has an `exit` (a 0.8s fade), so Continue crossfades into the Segue.

### Decisions made

- **Scope change (Oct 27):** the finish-line run is **dropped** (the wishes now auto-scroll, so there's no scroll to drive a runner). Pop-the-faces and the music are now stretch goals. Tap-to-expand wish cards stay. The quiz, candles and mini-game ideas are dropped.
- **Build order:** hero + message cards first, then the extra Segue beats and photos. The Segue already works end to end with just the first beat and _"and now…"_, so the core flow is shippable as is.
- **Renames:** "calendar" → "prompt", and "intro" → "Segue" (`Stage = 'lock' | 'prompt' | 'segue' | 'main'`).
- **Segue is tap-to-continue, not a timed animation** (Oct 27). She taps to move through the years, which replaces the earlier "blocked taps" design, so the _"Wait! She hasn't grown up yet"_ overlay is **dropped**.
- **Tone:** the transition should feel slow and dramatic (Star Wars / _Interstellar_): a held beat, the screen goes dark, the modal drops away and the photo is left alone. The prompt's decomposition exit was tried and replaced because it felt chaotic.
- **The prompt becomes the Segue's first beat (Oct 27).** After the modal fades, the screen is already the _"24 years ago"_ beat; the Segue doesn't show a second copy of the photo and text. Later beats (20 years ago, …) continue from there.
- **Prompt transition, tried and dropped (Oct 27):** a spring on the modal's drop (didn't like it, back to a plain ease-in); a 1.2× zoom on the photo; and a shared-`layoutId` glide of the photo and text to the Segue (replaced by a Continue button). The modal's drop is 24px (5px read as just a fade, 48px was too much).
- **"N years ago" comes from the photo's year, not from her age.** She turns 25, but the oldest photo is from when she was one (2002), so each beat says `2026 − photo year` years ago (the baby photo gives _24 years ago_). Store each beat's photo year in the data and compute N, so adding a photo can't leave a wrong number. Don't hardcode the text.
- **Passcode is her birthday, `311001`.** It's a lightweight gate, not security.
- **Cancel** on the lock screen is a no-op for now (it matches iOS); it becomes Delete once digits exist.
- **Notch behavior:** always fixed on scroll; after unlock the lock icon animates open, then fades away (like an iPhone), and the empty pill stays for the rest of the flow.

### What we learned (reuse these patterns)

- **Variants for staggered entrances:** define `hidden`/`show` once, put `initial`/`animate` on the parent, and give children only `variants`. Use this for the wish cards and the hero.
- **Don't mix Tailwind transform classes with Framer Motion** on the same element. Framer writes inline `transform`; use `whileTap`, `whileHover`, etc. instead of `scale-*`/`active:scale-*`.
- **Transforms count toward scroll overflow.** Scaling up a screen can reintroduce scroll; keep `overflow-hidden` on `<main>` (auto height, so it doesn't block page scroll later).
- **Compute `next`, don't re-read state** inside a handler right after `setState`.
- **`AnimatePresence` needs a conditional + unique `key`** on its direct children for exit animations to play.
- **Put shared insets inside each screen, not on the wrapper.** Padding on `<main>` leaves a strip of the outer background showing above a screen with its own color. Use a CSS variable (`--spacing-notch`) and `pt-notch` on each screen root; Tailwind's border-box sizing keeps `h-dvh` + padding from overflowing.
- **A fixed element is out of the layout flow**, so nothing knows it's there; reserve its space yourself.
- **Opacity and transform on a parent also apply to its children.** To animate a card's background separately from its contents (the prompt fades the card but keeps the photo), make the background a sibling layer, not the parent.
- **A child with no matching variant falls back to its `hidden` state, not "stay as you are".** When the parent switches to `'leave'`, every child needs its own `leave` entry, and each entry must list every property it should hold (the photo needed `opacity: 1, y: 0`, the card needed `scale: 1`). Otherwise it vanishes or jumps.
- **Shared `layoutId` makes an element glide between screens.** Framer remembers the old box and animates the new element from it (a transform-only FLIP, so it's cheap). Don't start the new screen's wrapper at `opacity: 0`, and set the speed with `transition={{ layout: { … } }}`, not with `animate`.
- **Sequence a hand-off in two phases.** Fade the other pieces in the old screen first, then switch the stage from the longest animation's `onAnimationComplete` (guard on the variant name, since it also fires on `show`). That beat of stillness is what makes the glide feel deliberate. (The prompt now waits for a Continue tap instead, but the pattern still applies.)
- **An invisible element still catches clicks.** A fully transparent element positioned over a button swallows the tap (the "years ago" text once covered Allow). Give decorative overlays `pointer-events-none`, and keep a button that fades in unclickable until its fade has finished.
- **Give each property its own transition when they need different motion.** `transition: { opacity: {...}, y: {...} }` lets one property spring while another tweens. A per-property object replaces the top-level one, so repeat the `delay` in each.
- **One `leaving` flag plus delay constants beats chained callbacks.** Every step of the prompt's exit is a delay measured from the tap, defined at the top of the file and derived from the step before it, so retuning one timing shifts the rest.
- **Measure animations, don't guess.** Both bugs above were found by logging `getBoundingClientRect()` and the effective opacity every ~250ms from the browser console while clicking through. It beats squinting at a fast animation.
- **Lift shared state to `App`.** When two siblings (like `Lock` and `Notch`) need the same fact, `App` owns the flag and passes it down.
- **SVG transforms:** rotate a sub-shape around its own corner with `transformBox: 'fill-box'` plus `transformOrigin`; otherwise it rotates around the SVG's top-left.

## Tech decisions

| Area      | Choice                                | Why                                                       |
| --------- | ------------------------------------- | --------------------------------------------------------- |
| Build     | Vite + React + TypeScript             | Fast dev loop, static output, the stack you wanted to try |
| Animation | Framer Motion                         | Springs, gestures, layout animation, scroll-linked values |
| Styling   | Tailwind CSS v4                       | Fast to iterate on layout; no config file in v4           |
| Content   | `src/content/wishes.ts` (typed array) | Adding a friend's card = adding one object                |
| Images    | Resized to ~800px WebP before commit  | Fast on roaming data; keep total media under ~5 MB        |
| Hosting   | Cloudflare Pages (fallback: Netlify)  | Free, fast globally, free `*.pages.dev` URL               |
| Domain    | Free URL for now                      | Revisit only if there's time left                         |

### iPhone / Safari gotchas to design around

- Use `100dvh`, not `100vh` (the URL bar changes the height).
- Don't use a native `<input>` for the passcode: it pops the system keyboard. Use a custom keypad. ✅
- iOS Safari has no `navigator.vibrate`, so use visual feedback only (shake, dot pulse). ✅
- Audio can't autoplay. If we add music, it starts on the first tap (the passcode taps are a natural trigger).
- Respect `env(safe-area-inset-*)` for the notch and home indicator.
- Keep falling-face counts modest (about 15–25 elements) so scrolling stays smooth.
- Add `noindex` ✅ and an Open Graph image/title so the WhatsApp/iMessage preview looks cute.
- Older iOS Safari can ignore `:active` styles without a touch listener. _Check the pressed-key states on the real phone._

## Next up (in order)

1. ✅ **Persistent notch.** Done: fixed pill in the `App` shell, `pt-notch` clearance per screen (see Progress log). _Still to check on a real iPhone: a fixed fake notch may sit under or double up with the real status bar; if so, add `env(safe-area-inset-top)` to its `top` offset. Also confirm `8rem` of top inset still fits the keypad on short phones._
2. ✅ **Open-lock moment.** Done: the shackle opens, then the icon fades, driven by `unlocked` in `App`.
3. ✅ **Birthday prompt.** Done: iOS-style modal that drops away around the photo, darkens the screen, shows _"24 years ago"_ and a Continue button (see Progress log). _Still to do: polish the wording, drop in a real baby photo (there's a grey placeholder), and watch the timings on a real iPhone._
   3b. 🟡 **Segue, first cut.** Done: the prompt shows the photo and _"24 years ago"_, Continue crossfades into _"and now…"_, then fade to `main`. _Still to do: the in-between beats (see step 7), real photos, and a look at the whole thing on a real iPhone._
4. **Hero.** **HAPPY BIRTHDAY** headline, hero photo, party-popper emojis, "25". Entrance animation (staggered letters, popper burst). Placeholder photo until the real one arrives. _Do this first._
5. **Wish cards + auto-scroll.** Typed `src/content/wishes.ts`; teaser on the front, tap to expand with `layout`/`layoutId`. Auto-scroll (a slow CSS/`transform` marquee) that pauses while a card is open or being touched. Decide vertical (two counter-moving columns) or a horizontal row once you see how many wishes arrive. Avatar fallback when there's no photo.
6. **Reduce repeated transition code.** With prompt, Segue and hero, pull `initial`/`animate`/`exit` and the shared `pt-notch` + `h-dvh` / `min-h-dvh` pattern into a small `Screen` wrapper.
7. **Finish the Segue.** The _"24 years ago"_ beat lives in the prompt now, so the Segue's list starts at the **second** photo: a small list of `{ year, photo }` entries (the label is computed with `yearsAgo(year)` from `src/content/years.ts`), then _and now…_. Each photo crossfades in the center frame, on the same `rgb(14, 18, 20)` background. Tap-to-continue between them. Needs the childhood photos (see Assets). Also decide the hero's entrance, so _"and now…"_ flows into it instead of a plain fade.
8. **Stretch: music and face rain.** Start the audio from the Allow tap (volume ramp from 0, royalty-free track, ~1–2 MB AAC/MP3). Face rain with tap-to-pop confetti if time allows.
9. **Polish.** `MotionConfig reducedMotion="user"`, Open Graph image, copy pass.

## Schedule

| Day           | Goal                                                                                                                      | Done when                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Mon 26** ✅ | Message friends. Scaffold the project. Deploy a "hello world". Build the passcode screen.                                 | Live URL; passcode screen works                            |
| **Tue 27** ✅ | Passcode screen, notch, birthday prompt and a first cut of the Segue (more than planned; the hero slipped to Wed).        | Lock → prompt → Segue → placeholder works                  |
| **Wed 28**    | Hero. Wish cards with auto-scroll and tap-to-expand.                                                                      | Lock → prompt → Segue → hero → auto-scrolling wishes works |
| **Thu 29**    | Finish the Segue beats and photos. Drop in real wishes/photos as they arrive (cutoff is Thursday evening). Music if time. | Whole flow works end to end; real content in               |
| **Fri 30**    | Test on a real iPhone (Safari, plus mobile data). Fix layout and perf. Polish and Open Graph image. Final deploy.         | You've cleared the whole flow twice on the phone           |
| **Sat 31**    | Send the link on her morning.                                                                                             | 🎉                                                         |

Wed and Thu are now the tight days. **Cut order if time runs short** (first to go at the top):

1. Face rain and tap-to-pop
2. Music
3. The extra Segue beats (keep the baby photo and _"and now…"_ as they are today)
4. Anything in step 9, "Polish"

The core flow (lock → prompt → Segue → hero → wish cards) must ship; the extra Segue beats are the next most valuable piece, and everything else is a bonus. (The finish-line run and the "Wait!" overlay are already cut.)

## Critical path: collecting friends' wishes

Everything else is in our control; this isn't. **Hard cutoff: Thu Oct 29 evening.**

Ask each friend for:

- a short wish (1–3 sentences),
- a photo (ideally of them, or of them with her),
- how they want their name shown.

Tell them to keep it secret. Cards with no photo fall back to an initial/emoji avatar, so a late or missing photo never blocks the build.

## Assets checklist

- [ ] **Hero photo** of her. Needed Wed (a placeholder works until then).
- [ ] **Baby photo** (from when she was about one, so ~2002). It appears in the birthday prompt's image box and stays on screen as the _"24 years ago"_ beat, so it's needed first (a grey placeholder works until then).
- [ ] **Childhood photos for the Segue:** ~3 more as she grows up (4 total with the baby photo). Needed Thu. **For each one, note the year it was taken**, because the "N years ago" text is computed from it.
- [ ] _(Stretch)_ 4–8 cutouts of her face as transparent PNGs for the face rain. On iPhone: Photos → long-press the subject → _Copy_ → paste into Preview → export as PNG.
- [ ] Friends' wishes + photos (see above)
- [ ] A song (optional) — a short loop or one favorite
- [ ] Her name/nickname as it should appear on the site
- [ ] An Open Graph preview image (1200×630)

## Risks

| Risk                                          | Mitigation                                                                       |
| --------------------------------------------- | -------------------------------------------------------------------------------- |
| Friends reply late                            | Hard cutoff; avatar fallback; the site works with just 2–3 cards                 |
| Safari quirks surprise us late                | Test on a real iPhone as each piece lands, not only on Friday                    |
| Too many animated elements janks on her phone | Cap the rain, animate only `transform`/`opacity`, skip `filter: blur`            |
| Childhood photos aren't ready by Thu          | Ship the Segue as it is (baby photo + _"and now…"_); the build uses placeholders |
| The Segue eats Wed/Thu                        | Its first cut already works; the hero and wishes come first                      |
| The long fades feel slow on a real phone      | The timings are constants (`BG_DELAY_S` and friends, `READY_DELAY_MS`); retune them |
| Link leaks or gets indexed                    | Unguessable-enough URL, `noindex`, the passcode gate                             |
| She guesses the passcode early                | That's fine — it only opens the surprise, and you control when you send the link |
| Scope creep                                   | Anything not in "The experience" waits until the core flow is done               |

## Out of scope

Custom domain, CMS, backend, user accounts, analytics, multiple languages. Revisit only if there's spare time.
