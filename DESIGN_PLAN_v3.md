# NeuralMix Design System v3.0 - Mintlify Reference Clone

## Goal
Clone the Mintlify design system (mintlify.com) to create a stunning, immersive landing page for NeuralMix that achieves 100x quality improvement.

## Reference Analysis (Mintlify)

### Visual Hierarchy
1. **Deep Space Background**
   - Dark navy: #0a0e1a to #0d1526 gradient
   - Aurora/northern lights effect: teal/green glow (#22d3ee, #34d399)
   - Star particles: scattered, varying opacity
   - Mountain silhouettes: dark shapes creating depth

2. **Typography**
   - Hero: Inter or similar, 64-80px, weight 800
   - Subtitle: 18-20px, weight 400, opacity 0.8
   - Clean, crisp, high contrast against dark bg

3. **Glassmorphism UI**
   - Semi-transparent cards: rgba(255,255,255,0.03) backgrounds
   - Border: 1px solid rgba(255,255,255,0.08)
   - Blur effects: backdrop-filter: blur(20px)
   - Rounded corners: 16-24px

4. **Interactive Elements**
   - "NEW" badge: green pill (#22c55e), white text
   - Fused input+button: input with integrated CTA button
   - Hover states: subtle lift + glow intensification

5. **Product Preview**
   - Below-fold screenshot/preview
   - Shows actual product interface
   - Creates scroll motivation naturally

## Asset Generation Plan (mmx CLI)

### Required Images
1. **Aurora Background** - Hero atmospheric glow
2. **Mountain Silhouettes** - Left/right depth elements
3. **Star Particles** - Animated/subltle background texture
4. **Product Screenshot** - Demo interface preview

### CSS Implementation Strategy
1. **Background Layer Stack** (z-index order):
   - Base: Deep navy gradient (#05070a → #0a0e17)
   - Layer 1: Aurora glow effect (CSS radial-gradient or image)
   - Layer 2: Mountain silhouettes (PNG/webp with transparency)
   - Layer 3: Star particles (CSS or small images)
   - Layer 4: Vignette overlay

2. **Glassmorphism System**:
   ```css
   --glass-bg: rgba(255, 255, 255, 0.03);
   --glass-border: rgba(255, 255, 255, 0.08);
   --glass-blur: blur(20px);
   ```

3. **Typography Scale**:
   - Hero: 72px, weight 800, letter-spacing -0.02em
   - H2: 48px, weight 700
   - Body: 16px, weight 400
   - Caption: 14px, weight 500

4. **Animation System**:
   - Page load: Fade in + subtle scale (1.02 → 1)
   - Scroll reveal: IntersectionObserver triggered fade-up
   - Aurora: Slow CSS animation (30-60s loop)
   - Stars: Twinkle effect with staggered delays
   - Hover: Transform lift + glow intensification

## Implementation Phases

### Phase 1: Generate Assets (mmx CLI)
- Generate aurora background image
- Generate mountain silhouette PNGs
- Generate product screenshot mockup
- Verify all assets load correctly

### Phase 2: CSS Architecture
- Implement background layer system
- Create glassmorphism utility classes
- Set up typography scale
- Build animation keyframes

### Phase 3: Component Development
- Hero section with all layers
- Navigation with blur backdrop
- Email capture form (fused input+button)
- Product preview section
- Features with glass cards
- Comparison table
- Stats section
- Footer

### Phase 4: Interactions & Polish
- Scroll animations
- Hover states
- Form interactions
- Mobile responsive
- Performance optimization

## Color Palette

### Primary
- `--bg-primary`: #05070a (deepest black)
- `--bg-secondary`: #0a0e17 (dark navy)
- `--bg-elevated`: #111827 (elevated surfaces)

### Accent (Mintlify-style aurora)
- `--accent-teal`: #22d3ee (cyan glow)
- `--accent-green`: #34d399 (green glow)
- `--accent-blue`: #3b82f6 (primary buttons)

### Text
- `--text-primary`: #f8fafc (white)
- `--text-secondary`: rgba(248, 250, 252, 0.7)
- `--text-muted`: rgba(248, 250, 252, 0.5)

## Success Criteria
- [ ] Hero loads with all background layers visible
- [ ] Aurora effect creates depth and atmosphere
- [ ] Glassmorphism cards look premium and tactile
- [ ] Typography is crisp and readable
- [ ] Scroll animations trigger smoothly
- [ ] Mobile version maintains visual quality
- [ ] Lighthouse score 95+ for performance
