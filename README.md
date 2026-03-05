# 🎂 Birthday Webpage

A personal, animated birthday webpage built with HTML, Tailwind CSS, and vanilla JavaScript. Features a book-opening entrance animation, scroll-reveal sections, an infinite photo strip, and a subtle dark mode toggle.

---

## Project Structure

```
/
├── index.html       # Page structure and content
├── style.css        # CSS variables, animations, and component styles
├── script.js        # Theme toggle, particles, scroll reveal, confetti
├── images/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...          # Your photos go here
└── README.md
```

---

## How to Use

**No build step required.** Just open `index.html` in any modern browser.

```bash
# Option 1 — double-click index.html
# Option 2 — serve locally
npx serve .
# or
python -m http.server 8000
```

---

## Personalising the Content

### Changing the name
In `index.html`, find every instance of `Friend.` or `Friend!` and replace with the person's actual name.

### Editing memory card text
Each memory card has two editable parts — a label and a message body:

```html
<p class="muted text-xs tracking-widest2 uppercase">a memory i cherish</p>
<p class="text-lg font-light leading-relaxed subtle italic">
  Your message goes here.
</p>
```

### Changing memory card photos
Replace the `<img>` tag inside each `.photo-placeholder` div:

```html
<div class="photo-placeholder">
  <img src="images/your-photo.jpg" class="w-full h-full object-cover" />
</div>
```

### Editing the photo strip
Find the `#stripInner` div. Replace or add `strip-item` divs with your images. Always duplicate the full set below itself for the seamless infinite scroll to work:

```html
<div class="strip-inner" id="stripInner">
  <!-- Original set -->
  <div class="strip-item"><img src="images/1.jpg" class="w-full h-full object-cover" /></div>
  <div class="strip-item"><img src="images/2.jpg" class="w-full h-full object-cover" /></div>
  <!-- ... -->

  <!-- Duplicate — required for seamless loop -->
  <div class="strip-item"><img src="images/1.jpg" class="w-full h-full object-cover" /></div>
  <div class="strip-item"><img src="images/2.jpg" class="w-full h-full object-cover" /></div>
  <!-- ... -->
</div>
```

Photos must be in the `images/` folder, in the same directory as `index.html`.

### Editing quotes and wish text
All quote and body text is plain HTML inside `<blockquote>` and `<p>` tags. Find them by their section comments (`<!-- 2. FIRST QUOTE -->`, `<!-- 6. BIRTHDAY WISH -->`, etc.) in `index.html`.

### Changing the sign-off name
At the very bottom of the page (section 7), update:

```html
<p class="reveal muted text-sm tracking-widest2 italic">— always yours</p>
```

Replace `always yours` with your name or any sign-off you like.

---

## Dark Mode

A tiny dot sits in the **bottom-right corner** of the page — barely visible by design. Clicking it toggles between light and dark mode. The preference is saved in `localStorage` and persists across page refreshes.

| | Light | Dark |
|---|---|---|
| Background | `#f8f4ef` | `#181A1B` |
| Alt background | `#ede8e0` | `#1e2022` |
| Text | `#2c2420` | `#D0CCC6` |
| Muted text | `#a89d90` | `#979691` |
| Dividers | `#d6cfc4` | `#3a3835` |

All colors are defined as CSS variables at the top of `style.css` inside `[data-theme="light"]` and `[data-theme="dark"]` blocks — easy to adjust.

---

## Features

- **Book-open entrance** — cover screen fades, then pages peel apart before the journey begins
- **Scroll reveal** — every section animates in as you scroll down
- **Memory cards** — 4 cards with photo + label + personal message, staggered entrance
- **Infinite photo strip** — horizontally scrolling film reel, pauses on hover
- **Floating particles** — subtle canvas animation in the background, theme-aware
- **Confetti burst** — triggered by the Celebrate button, uses palette matching the active theme
- **Dark mode toggle** — persistent, unobtrusive, CSS-variable based

---

## Customising the Design

### Colors
Edit the CSS variable blocks at the top of `style.css`:

```css
[data-theme="light"] {
  --bg: #f8f4ef;
  --ink: #2c2420;
  /* ... */
}

[data-theme="dark"] {
  --bg: #181A1B;
  --ink: #D0CCC6;
  /* ... */
}
```

### Font
The page uses **Cormorant Garamond** throughout (loaded from Google Fonts). To change it, update the `<link>` in `index.html` and the `font-family` in the Tailwind config:

```js
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Your Font"', 'Georgia', 'serif']
      }
    }
  }
}
```

### Strip scroll speed
In `style.css`, find `.strip-inner` and change the animation duration:

```css
animation: stripScroll 28s linear infinite; /* lower = faster */
```

---

## Browser Support

Works in all modern browsers — Chrome, Firefox, Safari, Edge. No build tools, no dependencies, no frameworks beyond Tailwind CDN.
