# Home Page — Simplification Proposal

> Goal: keep the hero carousel (client likes it), reduce visual noise everywhere else so the page feels fancy but calm, and make it easier for a customer to see "what can Coppola do for me" at a glance.

---

## TL;DR — What Changes

| Section | Today | Proposed |
|---|---|---|
| Hero | Two auto-scrolling image columns (10 photos, opposite directions, always moving) | **Keep the carousel**, but slow it down and drop to a single column, OR keep two columns but pause-by-default and only animate on hover — less motion, same "wow" |
| Signature Collections | Dark navy full-bleed section, animated gradient heading, expandable "Learn more" paragraph, 5 cards in an irregular grid | One consistent grid (no giant + small mismatch), no navy takeover, shorter static copy, no expand/collapse |
| Featured Collections | Separate section right after (redundant with Signature Collections above) | **Merge or remove** — having two "browse our stuff" sections back-to-back is what makes the page feel long |
| Why Choose Coppola | 4 cards fanned/rotated like a hand of cards, each with hover-tilt animation | Simple, flat 4-up grid, no rotation gimmick — same photos and copy, calmer presentation |
| Testimonials | Kept as-is | Kept as-is |
| Overall page length | Hero → Collections (dark) → Featured (again) → Why Choose (fanned) → Testimonials = 5 heavy sections | Hero → Collections → Why Choose → Testimonials = 4 sections, one clear idea each |

**Net effect:** same content, roughly 30–40% less visual "stuff" competing for attention, one fewer full section, no duplicate collection browsing, no rotation/fan gimmicks.

---

## Section-by-Section Detail

### 1. Hero (Keep — client likes this)

**What's there now:**
- Left: heading, subtitle, description, two buttons
- Right: two columns of images auto-scrolling in opposite directions, forever, at different speeds

**What we'd change:**
- Keep the dual-column scrolling carousel — this is the part the client likes
- Slow the scroll speed down ~30–40% so it reads as "elegant motion" instead of "busy"
- Everything else in the hero (heading, tag pills, buttons) stays untouched

**Why:** The client's complaint was about the *overall* page feeling like "a lot," not the hero specifically. Small motion tweak keeps what they like.

---

### 2. Signature Collections (Simplify)

**What's there now:**
- Full-bleed dark navy background (breaks the light theme of the rest of the site)
- Animated letter-by-letter heading
- A paragraph with a "Learn more / Show less" toggle
- 1 large card + 4 small cards in a mismatched grid

**What we'd change:**
- Remove the dark navy background — use the same light background as the rest of the page so the site feels like one continuous experience, not a slide deck
- Static heading (no letter animation)
- Short, single-length description — no expand/collapse interaction
- Even grid (all cards same size) instead of one large + four small

**Why:** The navy section currently acts like a hard stop in the middle of the page — it's the single biggest reason the page feels heavy. A customer scrolling down hits "light page → dark wall → light page again," which reads as more effort than it should.

---

### 3. Featured Collections (Merge or Cut)

**What's there now:**
- A second, separate "browse collections" component immediately follows Signature Collections

**What we'd change:**
- Either fold anything unique from this section into the Signature Collections grid above, or remove it entirely if it's showing the same categories twice

**Why:** This is the clearest duplicate on the page. Showing "our collections" twice in a row is very likely part of what reads as "a lot" to the client.

---

### 4. Why Choose Coppola (Simplify)

**What's there now:**
- 4 cards fanned out like a hand of playing cards (rotated at angles, offset heights, overlapping)
- Each card tilts back to flat and pops up on hover

**What we'd change:**
- Same 4 photos, same 4 headlines/descriptions
- Laid out as a clean, flat 4-column grid (or 2x2 on mobile) — no rotation, no overlap
- Simple hover: slight zoom or shadow lift, nothing more

**Why:** The fan effect is a nice trick but adds visual complexity and can look chaotic on first load, especially on smaller screens where cards stack. A flat grid reads as more premium/confident, not less.

---

### 5. Testimonials

No changes proposed — keep as-is.

---

## What Stays Exactly The Same

- All real content: headings, descriptions, photos, links — nothing is being deleted, only rearranged/calmed down
- The hero carousel concept the client already approved
- Brand colors, fonts, and overall style language
- All routes/links to product pages

---

## Suggested Next Step

Pick one of two paths:

1. **Light touch** — just fix the two biggest offenders: remove the dark navy break in Signature Collections, and cut the duplicate Featured Collections section. Fastest, lowest risk, still solves "it's a lot."
2. **Full simplification** — all changes above (hero motion, flat grids, no fan effect). More visual overhaul, same content.

We can mock up either path before touching production code.
