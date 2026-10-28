# Dila's Birthday Site — Plan

**Deadline:** Saturday, Oct 31, 2026 (she turns 25). Send the link on the morning of the 31st, her local time.
**Status:** Tue Oct 27 (evening). Lock screen, persistent notch and the birthday prompt (with its decomposition exit) are done. **Next: hero + message cards, built before the intro sequence.** **4 days left.**
**Audience:** one person, on an iPhone (Safari), possibly on roaming data.

## The experience

1. **Lock screen** ✅ — an iPhone-style passcode screen. 6 dots, custom on-screen keypad, passcode `311001`. Wrong code = shake. Right code = unlock transition.
2. **Birthday prompt** ✅ — an iOS-style permission modal ("Allow 'Birthday Celebration' to use your whole day?"). Tapping **Allow** makes the modal decompose: each piece (emoji, heading, body, image, button) flies off in its own direction while the card fades. This tap is also the user gesture that can start music (iOS blocks autoplay).
3. **Growing-up intro** _(non-interactive, built last)_ — a fully animated sequence: _"25 years ago…"_ with a baby photo, then ~4 photos of her growing up, then _"and now…"_, then a transition into the hero. Taps during it are blocked; a tap mid-way opens an overlay modal in the same iOS style: _"Wait! She hasn't grown up yet"_ with a **Continue** action (it resumes the sequence, not skips it).
4. **Hero** — a big **HAPPY BIRTHDAY**, a hero photo of her, party-popper emojis, "25".
5. **Wishes** — under the hero, an **auto-scrolling** view of the friends' messages (photo, name, teaser). Tapping a card pauses the scroll and expands it to the full message; closing resumes.
6. **Stretch / bonus** — face rain with tap-to-pop confetti behind the hero, and music (an _Interstellar_-style swell from a royalty-free track).

## Progress log

### Done

- **Project:** Vite + React + TypeScript scaffold, Tailwind v4 (via `@tailwindcss/vite`), Framer Motion. Builds and lints clean.
- **Hosting:** Cloudflare Pages is set up. _Still to confirm: latest code is pushed and the live URL opens on an iPhone._
- **Friend forms:** Google Forms drafted in English and Indonesian (name, short title message, long message; photos requested privately by message, not through the form because file upload forces a Google sign-in). _Still to confirm: both are sent, with a Thu Oct 29 cutoff._
- **Layout shell (`App.tsx`):** outer full-height wrapper with the `bg-mist-900` "wallpaper" and a centered `max-w-md` column, so desktop shows a phone-width column. `stage` state (`'lock' | 'calendar' | 'main'`) decides which screen shows.
- **Lock screen (`Lock.tsx`):**
  - Keypad with digits + letters (2 = ABC … 9 = WXYZ), centered `0`, iOS-style Cancel/Delete in the footer.
  - Pointer cursor, hover and pressed states on keys.
  - No page scroll: root is `h-dvh overflow-hidden`; keys and gaps scale from `dvh` so short phones still fit.
  - Entrance animation: header fades in; keys spring in with a short stagger and a rise from below (variants + `staggerChildren`).
  - Wrong code: dots shake, then clear (`useAnimationControls`).
  - Correct code: short pause, then `onUnlock`.
- **Unlock transition:** `AnimatePresence` in `App.tsx`; the lock zooms/fades out and the next screen eases in.
- **Persistent notch (`Notch.tsx`):** a `fixed` pill at the top of the viewport, rendered in `App` outside `AnimatePresence` so it survives every transition. `pointer-events-none`, `z-50`, centered with `inset-x-0` + `flex justify-center` (no Tailwind transform, so it doesn't clash with Framer). It stays fixed on scroll.
- **Open-lock moment:** `App` owns an `unlocked` flag and passes it to `Notch`. On the correct code `Lock` calls `onUnlock` immediately; `App.handleUnlock` sets `unlocked`, then switches to `calendar` after 700ms. The shackle is its own `motion.path` (rotates open around its bottom-right via `transformBox: 'fill-box'`), then the whole icon fades out with a 0.4s delay.
- **Notch clearance:** `--spacing-notch` is defined in `@theme` in `index.css` (currently `8rem`, one number to tune). Each screen puts `pt-notch` on its own root, alongside its background and `h-dvh` / `min-h-dvh`, so backgrounds fill the full column and only the content sits below the notch.

- **Birthday prompt (`BirthdayPrompt.tsx`):** replaces the "calendar reveal" (the stage is now `'prompt'`). The white card is its own absolutely positioned layer (`bg-white/90 backdrop-blur-xl`), a sibling of the content, so it can fade while the pieces fly out. One `leaving` flag on the parent drives `hidden` / `show` / `leave` variants; each piece passes `custom={i}` to pick its direction from a `SCATTER` table. The card's `onAnimationComplete` fires `onContinue` once the `leave` variant finishes. The button is disabled while leaving. The image box is still a grey placeholder. `App` currently sends `onContinue` straight to `main` (the intro isn't built yet).

### Decisions made

- **Scope change (Oct 27):** the finish-line run is **dropped** (the wishes now auto-scroll, so there's no scroll to drive a runner). Pop-the-faces and the music are now stretch goals. Tap-to-expand wish cards stay. The quiz, candles and mini-game ideas are dropped.
- **Build order:** hero + message cards first, the growing-up intro last, so the core flow ships even if the intro runs long. In the meantime the prompt goes straight to the hero.
- **Rename:** "calendar" is now "prompt" (`Stage = 'lock' | 'prompt' | 'main'`; an `'intro'` stage will slot in between `prompt` and `main`).
- **Open question:** the intro says "25 years ago" because the passcode `311001` implies she was born on Oct 31, 2001. Confirm that, or use 24 if that's intended.
- **Passcode is her birthday, `311001`.** It's a lightweight gate, not security.
- **Cancel** on the lock screen is a no-op for now (it matches iOS); it becomes Delete once digits exist.
- **Notch behavior:** always fixed on scroll; after unlock the lock icon animates open, then fades away (like an iPhone), and the empty pill stays for the rest of the flow.

### What we learned (reuse these patterns)

- **Variants for staggered entrances:** define `hidden`/`show` once, put `initial`/`animate` on the parent, and give children only `variants`. Use this for the wish cards and the calendar reveal.
- **Don't mix Tailwind transform classes with Framer Motion** on the same element. Framer writes inline `transform`; use `whileTap`, `whileHover`, etc. instead of `scale-*`/`active:scale-*`.
- **Transforms count toward scroll overflow.** Scaling up a screen can reintroduce scroll; keep `overflow-hidden` on `<main>` (auto height, so it doesn't block page scroll later).
- **Compute `next`, don't re-read state** inside a handler right after `setState`.
- **`AnimatePresence` needs a conditional + unique `key`** on its direct children for exit animations to play.
- **Put shared insets inside each screen, not on the wrapper.** Padding on `<main>` leaves a strip of the outer background showing above a screen with its own color. Use a CSS variable (`--spacing-notch`) and `pt-notch` on each screen root; Tailwind's border-box sizing keeps `h-dvh` + padding from overflowing.
- **A fixed element is out of the layout flow**, so nothing knows it's there; reserve its space yourself.
- **Opacity and transform on a parent also apply to its children.** To animate a card's background separately from its contents (the decomposition exit), make the background a sibling layer, not the parent.
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
3. ✅ **Birthday prompt.** Done: iOS-style modal with the decomposition exit (see Progress log). _Still to do: polish the wording and drop in a real photo of her (there's a grey placeholder)._
4. **Hero.** **HAPPY BIRTHDAY** headline, hero photo, party-popper emojis, "25". Entrance animation (staggered letters, popper burst). Placeholder photo until the real one arrives. _Do this first._
5. **Wish cards + auto-scroll.** Typed `src/content/wishes.ts`; teaser on the front, tap to expand with `layout`/`layoutId`. Auto-scroll (a slow CSS/`transform` marquee) that pauses while a card is open or being touched. Decide vertical (two counter-moving columns) or a horizontal row once you see how many wishes arrive. Avatar fallback when there's no photo.
6. **Reduce repeated transition code.** With prompt, hero and (later) intro, pull `initial`/`animate`/`exit` and the shared `pt-notch` + `h-dvh` / `min-h-dvh` pattern into a small `Screen` wrapper.
7. **Growing-up intro.** New `'intro'` stage between `prompt` and `main`: _"25 years ago…"_ + baby photo, ~4 growing-up photos, _"and now…"_, then the hero transition. Fully timed animation; an input-blocking layer during it; a mid-way tap opens the _"Wait! She hasn't grown up yet"_ overlay modal (same style as the prompt, **Continue** resumes). Needs the childhood photos (see Assets).
8. **Stretch: music and face rain.** Start the audio from the Allow tap (volume ramp from 0, royalty-free track, ~1–2 MB AAC/MP3). Face rain with tap-to-pop confetti if time allows.
9. **Polish.** `MotionConfig reducedMotion="user"`, Open Graph image, copy pass.

## Schedule

| Day                | Goal                                                                                                                           | Done when                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Mon 26** ✅      | Message friends. Scaffold the project. Deploy a "hello world". Build the passcode screen.                                      | Live URL; passcode screen works                                   |
| **Tue 27** ✅      | Passcode screen finished and animated, including the unlock transition (took the day; calendar/hero slipped to Wed).           | Lock → next-screen transition works                               |
| **Wed 28**         | ~~Persistent notch~~ and ~~birthday prompt~~ (done Tue). Hero. Wish cards with auto-scroll and tap-to-expand.                  | Lock → prompt → hero → auto-scrolling wishes works                |
| **Thu 29**         | Growing-up intro (+ the "Wait!" overlay). Drop in real wishes/photos as they arrive (cutoff is Thursday evening). Music if time. | Whole flow works end to end; real content in                      |
| **Fri 30**         | Test on a real iPhone (Safari, plus mobile data). Fix layout and perf. Polish and Open Graph image. Final deploy.              | You've cleared the whole flow twice on the phone                  |
| **Sat 31**         | Send the link on her morning.                                                                                                  | 🎉                                                                |

Wed and Thu are now the tight days. **Cut order if time runs short** (first to go at the top):

1. Face rain and tap-to-pop
2. Music
3. The "Wait! She hasn't grown up yet" overlay (keep the intro itself)
4. Shorten the intro to 2 photos (baby, then recent) if the photos arrive late
5. Anything in step 9, "Polish"

The core flow (lock → prompt → hero → wish cards) must ship; the growing-up intro is the next most valuable piece, and everything else is a bonus. (The finish-line run was already cut.)

## Critical path: collecting friends' wishes

Everything else is in our control; this isn't. **Hard cutoff: Thu Oct 29 evening.**

Ask each friend for:

- a short wish (1–3 sentences),
- a photo (ideally of them, or of them with her),
- how they want their name shown.

Tell them to keep it secret. Cards with no photo fall back to an initial/emoji avatar, so a late or missing photo never blocks the build.

## Assets checklist

- [ ] **Hero photo** of her. Needed Wed (a placeholder works until then).
- [ ] **Childhood photos for the intro:** a baby photo plus ~3 more as a young girl (4 total). Needed Thu.
- [ ] A photo of her for the birthday prompt's image box.
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
| Childhood photos aren't ready by Thu          | Cut the intro to 2 photos; the build doesn't depend on the real images           |
| The intro runs long and eats Thursday         | It's built last; the prompt can go straight to the hero as a fallback            |
| Link leaks or gets indexed                    | Unguessable-enough URL, `noindex`, the passcode gate                             |
| She guesses the passcode early                | That's fine — it only opens the surprise, and you control when you send the link |
| Scope creep                                   | Anything not in "The experience" waits until the core flow is done               |

## Out of scope

Custom domain, CMS, backend, user accounts, analytics, multiple languages. Revisit only if there's spare time.
