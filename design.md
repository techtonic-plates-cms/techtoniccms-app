The best interfaces feel inevitable. Not because they are simple, but because every choice reinforces every other choice until removing any one of them would make the whole thing collapse.

# Techtonic CMS — Design Document

## Overview

Techtonic CMS is a headless content management dashboard whose visual identity is rooted in geological metaphor. The name evokes tectonic plates — massive, slow-moving, foundational. The interface should feel the same way: solid, grounded, warm, and quietly powerful. Nothing floats. Nothing drifts. Everything sits where it belongs, layered like sedimentary rock.

The design rejects the cold, clinical aesthetic typical of developer tools. Instead, it embraces an earthy warmth that makes staring at content tables for hours feel less like work and more like sitting in a well-lit workshop carved from stone.

The interface is clean and functional — no decorative effects, no parallax grids, no 3D elements. The focus is on a content-rich dashboard that feels solid, stable, and natural. The single ornamental gesture is a subtle volcanic rock crack texture that lives only on the shell (sidebar and top bar), giving the chrome a sense of geological age while the workspace remains pristine.

---

## Philosophy

### What This Design Believes

- **Stability over spectacle.** The dashboard is a tool for daily use. It should feel like a reliable work surface, not a gallery piece.
- **Warmth over coolness.** Earth tones, warm neutrals, and muted accents create an environment people want to spend time in.
- **Consistency over cleverness.** Every panel, every row, every button follows the same logic. No surprises.
- **Texture as identity.** A single, restrained textural element — the cracked volcanic rock pattern on the shell — gives the interface its geological character without competing with content.

### What This Design Rejects

- **No gradients on backgrounds.** Gradients suggest atmosphere, sky, weightlessness. This interface is about weight.
- **No drop shadows on cards.** Shadows imply floating, suspension, detachment from a surface. Everything here touches the ground.
- **No glassmorphism.** Frosted glass is beautiful but meaningless. There is nothing behind this interface to look at.
- **No decorative illustrations.** No geological clipart, no tectonic plate diagrams, no mountain landscapes. The earthy quality comes from the color palette, the flatness, and the single crack texture — not from literal imagery.
- **No loading animations, no parallax, no scroll-jacking.** Motion is reserved for state changes. The interface arrives fully formed and stays still.
- **No border-radius on everything.** Cards and buttons have soft corners, but the overall structure is orthogonal. The sidebar is a rectangle. The top bar is a rectangle. Organic shapes are accents, not the architecture.

---

## The Earth Palette

Every color is drawn from the natural world. The palette is intentionally small — five functional neutrals plus three geological accents. Limitation creates coherence.

### Foundation (Neutrals)

These are your surfaces, your text, your borders. They form the structural bedrock of the interface.

**Light Mode**

- **Page Background:** Warm off-white, like dried clay or sun-bleached stone (`#F5F0E8`). It is not pure white — pure white is sterile, clinical, hostile. This color has a memory of earth in it.
- **Card / Panel Surfaces:** Clean white (`#FFFFFF`). Cards lift slightly from the background. The contrast between page and card is gentle, not stark — like a slab of polished stone sitting on rougher ground.
- **Hover Surfaces:** A slightly darker warm tone (`#F0EBE0`). When you touch something, it should feel like pressing your thumb into soft clay — subtle, responsive, organic.
- **Primary Text:** Near-black with warmth (`#1A1A1E`). Not `#000000`, which is abyssal. This is the color of wet soil.
- **Secondary Text:** Muted gray-brown (`#6B6B75`). For labels, timestamps, the quiet information that doesn't need to shout.
- **Borders:** Barely-there dividers (`#E0DCD4`). The color of fine dust settled on a surface.

**Dark Mode**

- **Page Background:** Deep charcoal, almost black but with a faint warmth — like volcanic rock cooling at dusk (`#0D0D0F`).
- **Card / Panel Surfaces:** Slightly lighter charcoal (`#16161A`). Cards in dark mode don't "lift" so much as they "emerge" from the darkness, like stone shapes revealed by low light.
- **Primary Text:** Warm off-white (`#F2EDE4`). The single most important decision in dark mode. Pure white (`#FFFFFF`) against dark surfaces is aggressive, cheap, headache-inducing. This text color carries a whisper of cream — the color of candlelight on limestone.
- **Secondary Text:** Cool gray (`#8C8C96`). Recedes naturally against the warm text.
- **Borders:** The faintest trace of light on dark stone (`#2A2A32`).

### Accents (Geological)

Three accent colors, constant across both light and dark modes. They never change because they are the identity of the product.

- **Copper** (`#C75A1A`): The primary accent. Warm, metallic, assertive. Used for active navigation states, primary buttons, the logo mark, positive action highlights, progress bar fills, metric card top borders. Copper is the color of earth's conductivity — it connects things.
- **Moss Green** (`#3A5A40`): The success color. Dark, muted, ancient. Used for "Settled" status badges, positive delta indicators, avatar backgrounds. Moss grows on old stone. It means something has become permanent.
- **Gold** (`#D4A017`): The attention color. Not bright or garish — more like raw mineral ore. Used for "Under Pressure" status badges, items that need human eyes. Gold is rare earth, something to notice.

### The Warmth Principle

Both light and dark modes share a warmth bias. Light mode has warm backgrounds and cool-gray text. Dark mode has cool backgrounds and warm-cream text. This asymmetry is intentional — it prevents either mode from feeling one-dimensional. The interface breathes in both directions.

---

## Typography

Two typefaces. That is all.

- **Inter** (400, 500, 600, 700): The workhorse. Used for every piece of UI text — headings, body, labels, buttons, table cells, card titles. Its slightly rounded forms feel friendly without being casual, technical without being cold.
- **JetBrains Mono** (400, 500): The specialist. Used exclusively for timestamps, IDs, system metrics, and any data that benefits from fixed-width alignment. Its presence is quiet — you notice it only when you need it.

### Type Scale

The scale is tight. Four sizes do all the work:

- **Hero (28px / 36px):** Metric values. Bold. These are the numbers you check first when you open the dashboard — total content count, published items, draft queue. They sit at the top of the visual hierarchy.
- **Title (17px / 24px):** Card and panel headers — "Content Layers," "Recent Shifts," "Strata." Semibold. This tier fills the gap between hero numbers and body text.
- **Body (14px / 22px):** Table cells, activity descriptions, button labels. This is the reading layer. Comfortable at density, generous in line-height.
- **Label (11px / 16px):** Column headers, category names, delta indicators. Uppercase. Wide letter-spacing (`0.05em`). These are the whispered annotations — small enough to ignore when scanning, clear enough to read when searching.

There are no display fonts. No serif accents. No decorative typography. The interface speaks in one voice.

---

## Surfaces and Depth

The interface is fundamentally flat. No drop shadows. No elevation layers. No glassmorphism.

Depth is expressed through:

- **Color contrast:** Cards sit on a differently-colored background. That is the only depth cue.
- **Borders:** 1px solid lines in the border-subtle color separate cards from their surroundings and divide internal regions.
- **Hover states:** Surfaces warm slightly on interaction — a tactile acknowledgment.
- **A single shadow on the sidebar:** A 2px right-edge shadow (`rgba(0,0,0,0.04)`) casts the sidebar slightly forward from the content area. This is the only shadow in the entire interface. It exists because the sidebar is architectural — a wall, not a floating panel.

The metaphor is not "floating cards in space." It is "slabs on a workbench." Everything touches something. Nothing hovers.

---

## The Volcanic Texture

A single ornamental element: a cracked volcanic rock pattern that lives exclusively on the shell (sidebar and top bar). The content area background is completely flat — a clean workspace free of visual noise.

### Where It Lives

- **Sidebar:** The full vertical surface carries the crack texture.
- **Top Bar:** The horizontal header strip carries the same texture.
- **Content area:** No texture. Flat, solid, uninterrupted.

### What It Looks Like

The texture is composed of hand-drawn SVG paths that tile seamlessly across the surface. It contains two distinct families of fracture:

**Smooth curved fractures:** Main crack lines that flow organically using quadratic bezier curves, with smooth continuations that fork and wander like geological faults following lines of least resistance. These are the dominant visual lines — thicker strokes (0.9–1.2px) that guide the eye.

**Sharp jagged fractures:** Angular polyline cracks with sudden direction changes, zigzags, and abrupt forks. These use `stroke-linejoin: miter` for crisp pointed corners. They are the secondary family — thinner strokes (0.7–1.1px) that create the irregular, random quality of real rock.

**Branches:** Both smooth and sharp main fractures sprout smaller connecting branches — hairline offshoots that join adjacent cracks, creating a network rather than isolated lines.

**Micro-fractures:** The finest detail — tiny stress lines radiating from fracture junctions at 0.2–0.3px stroke width. These are barely perceptible individually but collectively give the surface its geological density.

### Opacity and Visibility

The crack color is set to approximately 3.5–6% opacity against the surface color. This is the threshold of perception — the texture is felt rather than seen. Looking directly at the sidebar, you might not consciously register the cracks. But comparing a textured surface to a flat one, the difference is unmistakable: one reads as aged stone, the other as fresh paint.

The light and dark modes use appropriately inverted crack tones:

- Light mode: Brown-gray cracks (`rgba(26, 26, 30, 0.03–0.055)`) on warm off-white
- Dark mode: Warm-gray cracks (`rgba(242, 237, 228, 0.035–0.06)`) on charcoal

This ensures the cracks are always just barely visible — a whisper of texture, not a shout.

---

## Spatial Language

### The Grid

The layout is a fixed spatial system. The sidebar anchors the left edge. The top bar caps the viewport. Everything else lives in the remaining rectangle. This creates a sense of architectural enclosure — the dashboard is a room, not a scrolling document.

**The sidebar** is 240 pixels wide. It houses navigation, the product identity, the theme control, and the user. In its expanded state it feels like a hallway — a passage to different rooms. Collapsed to 72 pixels, it becomes a narrow ledge, still present but out of the way.

**The top bar** is 56 pixels tall. It holds wayfinding (breadcrumbs), search, and notifications. It is the compass bar — always visible, always informative.

**The content area** fills the remaining space. It scrolls vertically when content overflows, but the sidebar and top bar never move. This separation between fixed chrome and scrolling content is fundamental to the feeling of stability.

### Density and Breathing

- Cards are padded with 20 pixels internally.
- Cards are separated by 24 pixels externally.
- Table rows are compact but not cramped — roughly 48 pixels tall, with hover feedback.
- The right panel (visible on large screens) is 380 pixels wide — a dedicated column for secondary information that never fights with the main content for attention.

### Border Radius

Cards use 8px radius — enough to feel friendly, not enough to feel playful. Buttons use 6px. Filter pills and status badges use full pill radius. Avatars are fully round. This progression (square → soft corner → circle) creates a subtle hierarchy of organicness.

---

## Motion and Interaction

### Transitions

All state changes are fast and minimal:

- Hover background shifts: 100–150ms
- Color changes on nav items: 150ms
- Theme toggle crossfade: immediate (CSS custom property swap)

There are no entrance animations, no loading spinners with personality, no parallax. The interface appears fully formed and stays still. Stability is the aesthetic.

### Feedback Patterns

- **Navigation active state:** A 3px copper bar appears at the left edge of the active item. The entire row receives a faint copper-tinted background (4% opacity copper) so the whole surface breathes, not just the edge. The icon and label shift from muted gray to copper and full weight. This is the most assertive visual signal in the sidebar — it says "you are here."
- **Row hover:** Table rows receive a slightly warmer background. The action menu (three dots) materializes from invisible to visible — it was always there, you just couldn't see it until you needed it.
- **Search focus:** The border glows copper. The caret is copper. It draws the eye without shouting.
- **Theme toggle:** A `Sun` icon becomes `Moon`. The entire interface inverts its temperature — warm clay becomes cool stone, cool stone becomes warm clay — in a single frame. The toggle lives in the sidebar footer, next to the user profile, as a deliberate "room control" rather than a top-bar utility.
- **Button hover:** The "+ New Entry" button darkens slightly on hover (`brightness: 110%`), giving a tactile press-ready feel.

---

## Components

### Background

A flat, solid-color surface. No gradients. No textures. No images. The background is the floor of the workshop — you don't look at it, but everything stands on it. The shell above it carries the volcanic texture; the content area is bare.

### Sidebar

A vertical column of navigation, 240px wide, fixed to the left edge.

**Sections (top to bottom):**

1. **Logo block (56px height):** A copper square (`#C75A1A`) containing a globe icon, next to the word "Techtonic" in semibold type. Collapses to icon-only at 72px width.

2. **Navigation (flex-1):** Five items — Dashboard, Collections, Media, Users, Settings. Each with a Lucide icon (20px) and label.

3. **Theme toggle:** A button with sun/moon icon and "Light Mode" / "Dark Mode" label. Sits above the user profile as a deliberate room control.

4. **User profile (64px height):** A moss-green avatar circle with the user's initials, name, and role.

**Active state:** 3px copper left-border accent. The entire row gets a faint copper-tinted background (4% opacity). Icon and label text switch from secondary gray to copper and primary weight. Transition: 150ms.

**Collapsed state:** Width shrinks to 72px. Only icons visible. Toggle button appears (mobile only).

**Shadow:** A 2px right-edge shadow separates the sidebar from the content area — the only shadow in the interface.

### Top Bar

A horizontal strip, 56px tall, fixed to the top, spanning from the sidebar's right edge to the viewport's right edge.

**Left:** Breadcrumb trail — "Techtonic" / active section name, separated by a chevron icon.

**Right actions (gap: 12px):**

1. **Search input (240px wide):** Icon + placeholder "Search content...". Focus state changes border to copper and background to hover surface. Caret color: copper.
2. **Notifications (36px square button):** Bell icon with a 4px copper dot badge at top-right.

**Texture:** The top bar carries the same volcanic rock crack pattern as the sidebar, creating a continuous textured shell around the workspace.

### Metric Cards

Four cards in a responsive grid: 1 column → 2 columns (tablet) → 4 columns (desktop).

Each card uses the card surface color, a 1px border-subtle border, 8px radius, and 20px padding. A **2px copper top border** runs across the full width of each card — a mineral vein that says "this contains something valuable."

- **Label:** 11px uppercase, secondary text color.
- **Value:** 28px bold, primary text color.
- **Delta pill:** Rounded-full. Green (moss, 15% opacity background) for positive, copper (15% opacity background) for negative. Includes up/down arrow icon.

### Content Table

A card titled "Content Layers" containing a filterable data table.

**Filter pills:** A horizontal row of pill-shaped buttons above the table — All, Article, Documentation, Guide, Tutorial, Announcement. The active pill uses a copper background with white text. Inactive pills use a transparent background with a subtle border. Clicking a pill filters the table in place.

**Header:** "Content Layers" title (17px semibold) + "+ New Entry" button (copper background, white text). The button darkens slightly on hover.

**Columns:** Title, Type, Author, Status, Last Updated, Actions.

**Status badges (geological names):**

- **Settled** (`rgba(58, 90, 64, 0.15)` bg, moss text): Content that has been published and is stable.
- **Unformed** (`rgba(107, 107, 117, 0.15)` bg, secondary text): Content still in draft — raw material, not yet shaped.
- **Under Pressure** (`rgba(212, 160, 23, 0.15)` bg, gold text): Content in review — valuable, needing attention, like ore under geological pressure.

Badges are pill-shaped. They read as "stains" of color on the surface rather than separate objects.

**Row interactions:** Hover changes background to hover surface (100ms transition). The action button (three dots) appears via opacity 0 → 1 on row hover.

**Footer:** "Showing 1–N of 247" + Previous/Next pagination buttons.

### Right Panel

A vertical stack of three cards (gap: 24px), visible only at 1280px and above.

**1. Recent Shifts:** A feed of user actions recast in geological vocabulary. Each item shows: moss-green avatar circle, action verb in geological terms (`settled`, `shifted`, `formed`, `eroded`), target name, and timestamp in mono font. Separated by border-subtle dividers.

**2. Strata:** A horizontal stacked bar showing content type distribution — like a geological cross-section revealing layers of deposited material. Four segments: Articles (copper), Docs (moss), Guides (gold), Other (secondary gray). Below the bar, a legend with color dots, labels, and percentages.

**3. Core Pressure:** Three horizontal progress bars monitoring system resources — CPU Load, Memory, Storage. Bars use copper fill against the page background track. Values shown in monospace with unit labels (`%`, `GB`). The name evokes geological core sampling and subsurface pressure readings.

---

## Light and Dark Mode

The theme toggle is not an afterthought. It is a first-class feature.

**Light mode** is the workshop during the day: warm clay floors, white work surfaces, natural light. It is the default because most content work happens in well-lit environments.

**Dark mode** is the workshop at night: volcanic stone walls, low warm light from a single source, everything reduced to essential forms. It exists because content work also happens at 2am, and eye strain is the enemy of good judgment.

The transition between modes should feel like walking from one room into another — the structure is identical, the temperature has changed.

### Behavior

1. On initial load, the system checks for a stored preference. Falls back to the operating system's `prefers-color-scheme`.
2. The toggle lives in the sidebar footer, labeled "Light Mode" or "Dark Mode" with the appropriate sun/moon icon.
3. The transition is immediate — a single frame swap of CSS custom properties. No fade, no animation. The room changes when you flip the switch.
4. Preference persists across sessions.

---

## Responsive Behavior

The layout adapts at four breakpoints:

- **Mobile (< 768px):** Sidebar collapses to a 72px icon rail. Metrics stack in a single column. The table scrolls horizontally. The right panel is hidden. The theme toggle shows only the icon.
- **Tablet (768–1023px):** Sidebar expands. Metrics form a 2×2 grid. Right panel hidden.
- **Desktop (1024–1279px):** Full metrics row (4 columns). Right panel hidden.
- **Wide (≥ 1280px):** Complete layout — sidebar, top bar, two-column content grid with right panel. All geological labels visible.

At every breakpoint, the interface maintains its spatial logic: fixed textured chrome, flat scrolling content, consistent spacing.

---

## The Single Sentence

If you had to describe this interface to someone who will never see it, you would say:

**"It looks like a workshop carved from earth — warm, solid, and built to last."**
