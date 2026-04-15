# NeuralMix Design System v2.0
## Premium Audio Engineering Aesthetic

---

## 🎯 Design Philosophy

**Thesis:** NeuralMix is a precision instrument for audio professionals. The design must communicate:
- **Technical excellence** — Every pixel feels engineered
- **Studio credibility** — Dark, focused, distraction-free
- **AI sophistication** — Modern but not flashy
- **Professional warmth** — Approachable to indie musicians, credible to engineers

**Aesthetic Direction:** *Industrial Elegance* — Like a high-end mixing console meets modern AI interface. Think Ableton Live's dark mode + Linear's polish + Cursor's developer credibility.

---

## 🎨 Color System

### Primary Palette
```css
/* Background Hierarchy */
--bg-primary: #05070a;      /* Deepest black — page background */
--bg-secondary: #0a0e17;    /* Panel backgrounds */
--bg-tertiary: #111827;      /* Elevated cards, inputs */
--bg-elevated: #1a2234;      /* Toolbars, headers */

/* Accent Colors */
--accent-blue: #3b82f6;       /* Primary brand — links, CTAs */
--accent-blue-glow: rgba(59, 130, 246, 0.4);
--accent-cyan: #06b6d4;       /* Secondary — processing states */
--accent-cyan-glow: rgba(6, 182, 212, 0.3);

/* Semantic Colors */
--success: #22c55e;          /* Confirmations, checks */
--warning: #f59e0b;          /* Warnings, pending */
--error: #ef4444;            /* Errors, failures */

/* Text Hierarchy */
--text-primary: #f8fafc;     /* Headlines, important text */
--text-secondary: #94a3b8;   /* Body text, descriptions */
--text-tertiary: #64748b;    /* Captions, metadata */
--text-muted: #475569;       /* Disabled, placeholders */

/* Borders & Surfaces */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-medium: rgba(255, 255, 255, 0.1);
--border-strong: rgba(255, 255, 255, 0.15);
--surface-hover: rgba(255, 255, 255, 0.03);
--surface-active: rgba(255, 255, 255, 0.06);
```

### Usage Patterns
- **Borders:** Always subtle (`border-subtle`) except hover/active states
- **Glows:** Use for focus states, processing indicators, premium highlights
- **Surfaces:** Elevated elements use `bg-tertiary`, floating elements use `bg-elevated`

---

## 🔤 Typography System

### Font Stack
```css
/* Primary — Clean technical sans */
--font-display: 'Satoshi', 'Inter', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

### Type Scale (Major Third — 1.25)
| Token | Size | Weight | Line | Usage |
|-------|------|--------|------|-------|
| hero | 80px | 800 | 0.9 | Homepage hero headline |
| h1 | 64px | 800 | 1.0 | Page titles |
| h2 | 48px | 700 | 1.1 | Section headers |
| h3 | 32px | 700 | 1.2 | Card titles |
| h4 | 24px | 600 | 1.3 | Subsection headers |
| h5 | 20px | 600 | 1.4 | Small headers |
| body-lg | 18px | 400 | 1.6 | Featured paragraphs |
| body | 16px | 400 | 1.6 | Standard text |
| body-sm | 14px | 400 | 1.5 | Secondary text |
| caption | 12px | 500 | 1.4 | Labels, metadata |
| tiny | 11px | 500 | 1.3 | Tags, badges |

### Typography Rules
1. **Hero text:** Use `letter-spacing: -0.03em` for tighter headlines
2. **Gradient text:** Use sparingly, only for hero headlines
3. **Monospace:** Reserved for code, parameters, and technical values
4. **All caps:** Only for labels (10px, 500 weight, 0.1em letter-spacing)
5. **Text wrap:** Headlines use `text-wrap: balance` for better rag

---

## 📐 Spacing System

### Base Unit: 4px
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Layout Principles
- **Section padding:** `space-24` (96px) between major sections
- **Card padding:** `space-6` (24px) internal padding
- **Component gap:** `space-4` (16px) between related elements
- **Text spacing:** `space-3` (12px) between text blocks
- **Border radius:** 
  - Small: 6px (buttons, inputs)
  - Medium: 12px (cards, panels)
  - Large: 16px (modals, large cards)
  - Full: 9999px (pills, badges)

---

## 🎬 Motion & Animation

### Animation Principles
1. **Purposeful:** Every animation aids comprehension or delight
2. **Fast:** Most animations complete in 200-400ms
3. **Smooth:** Use `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
4. **Subtle:** Opacity and transform changes, rarely color

### Animation Tokens
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;

--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Standard Patterns

**Fade Up (scroll reveal)**
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
/* Duration: 600ms, Easing: ease-out */
```

**Pulse (processing indicator)**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
  50% { opacity: 0.8; box-shadow: 0 0 20px 5px rgba(59,130,246,0.2); }
}
/* Duration: 2s, Infinite */
```

**Waveform (audio visualization)**
```css
@keyframes waveform {
  0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
  50% { transform: scaleY(1); opacity: 0.8; }
}
/* Duration: 1.2s, Easing: ease-in-out, Staggered delays */
```

**Glow Expand (hover)**
```css
@keyframes glowExpand {
  from { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
  to { box-shadow: 0 0 30px 5px rgba(59,130,246,0.3); }
}
/* Duration: 300ms */
```

**Stagger Pattern**
- Delay increments: 50ms, 100ms, 150ms, 200ms
- Use for lists, grids, sequential reveals

---

## 🧩 Component Library

### Buttons

**Primary Button**
```css
.btn-primary {
  background: linear-gradient(135deg, var(--accent-blue), #2563eb);
  color: white;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  transition: all 200ms var(--ease-out);
  box-shadow: 0 4px 20px rgba(59,130,246,0.3);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 30px rgba(59,130,246,0.4);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-medium);
  color: var(--text-secondary);
  padding: 14px 28px;
  border-radius: 8px;
  transition: all 200ms var(--ease-out);
}
.btn-secondary:hover {
  border-color: var(--border-strong);
  color: var(--text-primary);
  background: var(--surface-hover);
}
```

**Ghost Button**
```css
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  padding: 8px 16px;
  transition: all 150ms var(--ease-out);
}
.btn-ghost:hover {
  color: var(--text-primary);
  background: var(--surface-hover);
}
```

### Cards

**Standard Card**
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 24px;
  transition: all 300ms var(--ease-out);
}
.card:hover {
  border-color: var(--border-medium);
  transform: translateY(-2px);
}
```

**Elevated Card**
```css
.card-elevated {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}
```

### Inputs

**Text Input**
```css
.input {
  background: var(--bg-primary);
  border: 1px solid var(--border-medium);
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 16px;
  color: var(--text-primary);
  transition: all 200ms var(--ease-out);
}
.input:focus {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
  outline: none;
}
```

### Badges & Pills

**Status Badge**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.badge-blue {
  background: rgba(59,130,246,0.1);
  border: 1px solid rgba(59,130,246,0.2);
  color: var(--accent-blue);
}
```

---

## 🎛️ DAW Interface Components

### Track Strip
```css
.track {
  display: grid;
  grid-template-columns: 140px 1fr 200px;
  gap: 16px;
  padding: 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  transition: all 300ms var(--ease-out);
}
.track.active {
  border-color: var(--accent-blue);
  box-shadow: 0 0 20px rgba(59,130,246,0.1);
}
.track.processing {
  animation: processingPulse 2s ease-in-out infinite;
}
```

### FX Slot
```css
.fx-slot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  font-size: 12px;
  transition: all 200ms var(--ease-out);
}
.fx-slot.active {
  border-color: var(--accent-blue);
  background: rgba(59,130,246,0.1);
}
```

### Waveform Visualization
```css
.waveform {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 50px;
}
.waveform-bar {
  flex: 1;
  background: linear-gradient(to top, var(--accent-blue), var(--accent-cyan));
  border-radius: 1px;
  opacity: 0.6;
  animation: waveform 1.2s ease-in-out infinite;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Responsive Patterns

**Typography scaling:**
- Hero: 80px → 48px (mobile)
- H1: 64px → 40px (mobile)
- H2: 48px → 32px (mobile)

**Layout shifts:**
- 3-column grid → 1-column stack
- Sidebar layouts → stacked on mobile
- DAW interface → simplified mobile view

---

## 🌟 Visual Effects

### Glow System
```css
/* Soft glow for subtle emphasis */
.glow-soft {
  box-shadow: 0 0 40px rgba(59,130,246,0.15);
}

/* Strong glow for focus/processing */
.glow-strong {
  box-shadow: 0 0 60px rgba(59,130,246,0.25);
}

/* Accent glow for CTAs */
.glow-cta {
  box-shadow: 0 4px 20px rgba(59,130,246,0.4);
}
```

### Gradient Patterns
```css
/* Hero gradient text */
.gradient-text {
  background: linear-gradient(135deg, #60a5fa 0%, #a5f3fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Card top highlight */
.card-highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(96,165,250,0.4), transparent);
}
```

### Noise & Texture
```css
/* Subtle noise texture overlay */
.noise-overlay {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* Grid pattern for technical feel */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

---

## 🎯 Interaction Patterns

### Hover States
- **Buttons:** Lift + glow intensify (transform + box-shadow)
- **Cards:** Subtle lift + border color change
- **Links:** Color transition only (no underline)
- **Inputs:** Border color + glow ring

### Focus States
- **All interactive:** 3px ring with 20% opacity accent color
- **Keyboard nav:** Visible focus ring required
- **Mouse click:** Brief scale-down (0.98) for tactile feel

### Loading States
- **Buttons:** Spinner replaces text, maintains width
- **Cards:** Pulse opacity + subtle border glow
- **Page:** Progress bar at top, content fades in

---

## 📝 Content Guidelines

### Voice & Tone
- **Direct:** "Upload your stems. Tell it what you want."
- **Technical but approachable:** Use audio terms but explain them
- **Action-oriented:** Lead with verbs
- **Confident:** "Professional-grade" not "high-quality"

### Writing Style
- **Headlines:** Short, punchy, benefit-focused
- **Descriptions:** 1-2 sentences max
- **CTAs:** Clear action + value ("Get Early Access — Free")
- **Error messages:** Helpful, never blame the user

---

## 🚀 Implementation Priority

### Phase 1: Foundation (Critical)
- [ ] Color system CSS variables
- [ ] Typography scale
- [ ] Spacing system
- [ ] Button components
- [ ] Card components

### Phase 2: Enhancement (High)
- [ ] Animation library
- [ ] DAW components
- [ ] Form components
- [ ] Icon system

### Phase 3: Polish (Medium)
- [ ] Micro-interactions
- [ ] Advanced animations
- [ ] Responsive refinements
- [ ] Accessibility audit

---

## 📐 Design Principles Checklist

Before shipping any UI, verify:

- [ ] **Contrast:** All text meets WCAG AA (4.5:1)
- [ ] **Typography:** No more than 3 font families
- [ ] **Spacing:** Uses 4px grid system exclusively
- [ ] **Color:** Maximum 12 unique non-gray colors
- [ ] **Animation:** All motion has purpose and completes <400ms
- [ ] **Hierarchy:** Visual weight matches information priority
- [ ] **Consistency:** Same patterns reused throughout
- [ ] **Responsiveness:** Works at all breakpoints
- [ ] **Accessibility:** Keyboard navigable, screen reader friendly
- [ ] **Performance:** No layout thrashing, 60fps animations

---

**Version:** 2.0  
**Last Updated:** April 15, 2026  
**Owner:** NeuralMix Design Team
