# 🎲 Decision Wheel Spinner

A beautiful, animated spin-the-wheel app for when you can't decide. Add your options, hit spin, and let chance pick for you.

![Screenshot placeholder](screenshot.png)

## ✨ Features

- 🗂 **8 built-in categories** — What to eat? / watch? / do? / drink? / Yes-or-No / Where to go? / Workout / Custom
- 🎨 **Vibrant animated wheel** rendered with HTML Canvas
- 🌀 **Smooth deceleration** with easing physics (4.5s spin, 5–7 full rotations)
- 🎉 **Confetti celebration** when a winner is picked
- ✏️ **Per-category customization** — add / remove / shuffle / reset to defaults / clear (up to 20 each)
- 📜 **Per-category history** — last 20 winners with timestamps, kept separately for each tab
- 💾 **localStorage persistence** — your options & history survive refreshes
- 📱 **Mobile-responsive** — works great on phone, tablet, desktop
- 🚀 **Zero dependencies** — single HTML file, no build step

## 🛠️ Tech Stack

- **Vanilla HTML, CSS, JavaScript** — no frameworks
- **Canvas API** for wheel rendering & animation
- **Web Animations API** for confetti
- **localStorage** for persistence

## 🚀 How to Run

Just open `index.html` in any modern browser. That's it.

```bash
# Or serve locally with any static server:
python -m http.server 8000
# then visit http://localhost:8000
```

## 📁 Structure

```
decision-wheel-spinner/
├── index.html    # Everything — markup, styles, logic
└── README.md
```

## 🎯 How It Works

1. Type an option in the input → click **Add** (or press Enter)
2. Click **Spin** (or click the wheel itself)
3. The wheel picks a uniformly random winner, then animates the rotation so the pointer lands precisely on that wedge
4. Confetti rains, modal pops, history updates

## 🎨 Customization

Edit the `COLORS` and `PRESETS` arrays at the top of the `<script>` tag in `index.html` to change the slice palette or add your own preset option lists.

---

Built as part of [MiniProjects](https://github.com/sourabhagarawal/MiniProjects).
