# NeuralMix Launch Plan
## AI Co-Pilot for Music Mixing — Viral Waitlist Strategy

**Version:** 1.0  
**Date:** April 15, 2026  
**Status:** Ready for Execution  
**Est. Build Time:** 6-9 hours  
**Target Audience:** Audio Engineers, Music Producers, Indie Musicians  
**Positioning:** "Your AI Co-Pilot for Music Mixing"

---

## 🎯 Strategic Overview

### The Problem We're Solving
Professional mixing costs $200-800 per track. DIY takes years to master. Current AI tools give you a black-box stereo file with zero control. NeuralMix is different: **stem-level precision with natural language control**.

### The Positioning Shift
**Old:** "AI Virtual Audio Engineer"  
**New:** **"Your AI Co-Pilot for Music Mixing"**

This reframing matters:
- **Co-pilot** = augmentation, not replacement (respects craft)
- **Collaborative** = you're still in control
- **Familiar** = echoes GitHub Copilot, which developers love
- **Indie-friendly** = priced for independent creators

### The Viral Hook
Dynamic waitlist position + gamified referrals. Users see exactly where they stand and can skip the line by sharing. Creates FOMO + incentives organic spread.

---

## 🏗️ Technical Architecture

### Stack Overview
```
┌─────────────────┐
│  Vercel (Edge)  │  Static HTML + Edge Functions
│                 │  • Global CDN
│                 │  • Handles viral traffic spikes
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Supabase     │  PostgreSQL + Edge Functions
│                 │  • User data ownership
│                 │  • Referral tracking
│                 │  • Real-time position queries
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Resend      │  Transactional email
│                 │  • Welcome emails
│                 │  • Deliverability optimized
└─────────────────┘
```

### Why This Stack
- **Supabase:** Data ownership from day one. When you launch the VST plugin, waitlist users become product users seamlessly.
- **Vercel:** Zero-config deployment, global edge network, handles traffic spikes automatically.
- **Resend:** Best-in-class deliverability for transactional emails. Free tier: 3,000 emails/day.

---

## 🗄️ Database Schema

### Table: `waitlist`
```sql
CREATE TABLE public.waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  referral_code text NOT NULL UNIQUE,
  referred_by_id uuid REFERENCES public.waitlist(id),
  referral_count integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  source text -- 'reddit', 'x', 'direct', 'friend'
);

-- Performance index for position calculation
CREATE INDEX idx_waitlist_referral_order 
ON public.waitlist (referral_count DESC, created_at ASC);
```

### Design Decisions
- **Single table:** Ruthlessly minimal. No separate referrals table.
- **referral_code:** Unique 8-character alphanumeric, URL-safe.
- **referred_by_id:** Self-referential foreign key for attribution.
- **referral_count:** Denormalized counter for fast ranking.
- **source:** Attribution tracking for Reddit/X ROI analysis.

---

## ⚡ Edge Functions (3 Total)

### 1. `POST /signup` — Submit Waitlist Entry
**Purpose:** Handle form submission, create user, process referrals, send welcome email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "referral_code": "ABC12345", // optional
  "source": "reddit" // optional
}
```

**Logic:**
1. Validate email format (regex)
2. Check rate limit (IP-based, 5 attempts per 15 min)
3. Block disposable emails (blocklist check)
4. Generate unique referral code (8 chars)
5. If referral_code provided:
   - Find referrer by code
   - Increment referrer's referral_count
   - Set referred_by_id
6. Insert into waitlist table
7. Call Resend API to send welcome email
8. Return success + user's referral_code

**Response:**
```json
{
  "success": true,
  "referral_code": "XYZ98765",
  "position": 1247,
  "share_url": "https://neuralmix.com/?ref=XYZ98765"
}
```

**Security:**
- CORS restricted to neuralmix.com
- Rate limiting via IP (store in memory, 15-min window)
- Input sanitization
- Resend API key in env vars

---

### 2. `GET /status?ref=ABC12345` — Get User Status
**Purpose:** Return user's waitlist position, referral count, and total users.

**Query Params:**
- `ref` (required): User's referral code

**Logic:**
1. Validate referral_code exists
2. Calculate user's position using ROW_NUMBER():
   ```sql
   WITH ranked_users AS (
     SELECT id, ROW_NUMBER() OVER (
       ORDER BY referral_count DESC, created_at ASC
     ) as position
     FROM waitlist
   )
   SELECT position FROM ranked_users WHERE id = ?
   ```
3. Get total user count
4. Get user's referral_count

**Response:**
```json
{
  "position": 1247,
  "total_users": 1847,
  "referral_count": 3,
  "referral_code": "ABC12345",
  "share_url": "https://neuralmix.com/?ref=ABC12345"
}
```

---

### 3. `GET /total-users` — Get Total Count (Cached)
**Purpose:** Provide count for landing page counter. Heavily cached.

**Logic:**
1. Query: `SELECT COUNT(*) FROM waitlist`
2. Return with cache headers:
   ```
   Cache-Control: public, max-age=300, stale-while-revalidate=60
   ```

**Response:**
```json
{
  "total": 1847
}
```

---

## 🎨 UI/UX Design Direction

### Target Audience Psychology
**Primary:** Indie music producers, bedroom artists, sound engineers
**Secondary:** Content creators, podcasters, game devs

**Their Pain Points:**
- "I can't afford a mixing engineer for every track"
- "I spend more time mixing than making music"
- "Logic's 'Auto Mix' destroys my dynamics"
- "LANDR gives me a black box, no control"

**Their Aspirations:**
- "I want my tracks to sound professional"
- "I want to release more music, faster"
- "I want to focus on creativity, not technical details"

### Design Principles

**1. Dark Mode by Default**
- Matches DAW aesthetic (Ableton, Logic, FL Studio)
- Reduces eye strain for night studio sessions
- Creates premium, professional feel

**2. Co-Pilot Language Everywhere**
- Hero: "Your AI Co-Pilot for Music Mixing"
- Subhead: "Upload your stems. Tell it what you want. Watch your mix transform."
- CTA: "Get Early Access" (not "Join Waitlist" — sounds passive)

**3. Studio-Inspired Visuals**
- Waveform animations
- Fader/meter aesthetics
- DAW-like mockup in hero
- Subtle grid patterns (like mixing console)

**4. Trust Signals for Engineers**
- "Stem-level precision" — addresses the black-box concern
- "Works inside your DAW" — no round-trip workflow
- Team credentials (audio engineer + ML engineer)
- "No watermarks, no limits" in early access

### Color Palette
```css
--bg-primary: #070b14;      /* Deep studio black */
--bg-secondary: #0d1526;    /* Console panel */
--accent-blue: #3b82f6;     /* Digital readout blue */
--accent-cyan: #06b6d4;     /* Waveform cyan */
--text-primary: #e8edf5;    /* Clean white */
--text-muted: #94a3b8;      /* Secondary text */
```

### Key Sections

**1. Hero Section**
- Dynamic counter: "Join 1,847 producers getting early access"
- Single-field form: Email only
- Visual: Animated waveform stems showing the product
- Trust badges: Ableton, Logic, FL Studio compatible

**2. The Co-Pilot Pitch**
- 3-column grid:
  - **Natural Language:** "Make the vocals punchier" — no knobs, no curves
  - **Stem Control:** Tweak vocals, drums, bass individually
  - **DAW Native:** Works inside Ableton, Logic, FL Studio

**3. Comparison Section (Why NeuralMix)**
| Feature | Human Engineer | LANDR | Logic Auto | NeuralMix |
|---------|---------------|-------|------------|-----------|
| Price | $300/track | $25/mo | Free | $19/mo |
| Control | Full | None | Minimal | Stem-level |
| Speed | 2-3 days | Minutes | Seconds | Seconds |
| Learning Curve | N/A | Low | Low | Zero |

**4. Social Proof / Stats**
- "12M artists on Spotify, 500K amateur creators, 66% AI adoption willingness"
- Positions the market opportunity

**5. Post-Signup Referral Page**
- Big number: "You're #1,247 in line"
- Progress bar showing advancement potential
- Share buttons with pre-written copy
- "Share to skip 50 spots per friend who joins"

---

## 🚀 Launch Playbook

### Phase 1: Soft Launch (Day 1)
**Goal:** Test the complete flow with 10-20 friends

**Checklist:**
- [ ] Deploy to production URL
- [ ] Test signup flow end-to-end
- [ ] Verify welcome email delivers
- [ ] Test referral attribution
- [ ] Check mobile responsiveness
- [ ] Validate social meta tags

---

### Phase 2: Reddit Launch (Day 2-3)
**Goal:** First viral wave from music production communities

**Primary Post (r/WeAreTheMusicMakers):**
```
Title: I got tired of paying $300 for mixing, so I built an AI co-pilot 
that mixes my stems with natural language

Body:
[Screen recording showing the VST inside Ableton]

"Make the vocals cut through without getting harsh" → AI analyzes and 
applies per-track EQ, compression, saturation.

Currently #1,247 in the waitlist. Comment "mix" and I'll DM you a link 
to get ahead of me.

Tech details: Custom DSP + local LLM for latency. Runs inside your DAW, 
not a cloud round-trip.
```

**Secondary Subreddits:**
- r/edmproduction (timing: Tuesday/Wednesday afternoon)
- r/AudioEngineering (focus on stem-level precision)
- r/musicproduction (broader appeal)
- r/ableton, r/logicstudio, r/flstudio (DAW-specific)

**Strategy:**
- Post at 9-11am PST ( peak Reddit hours)
- Respond to every comment within 30 minutes
- DM the link personally (don't post publicly — avoids spam filters)
- Track which subreddit drives most conversions via `source` param

---

### Phase 3: X/Twitter Launch (Day 3-5)
**Goal:** Build hype with audio comparisons and technical transparency

**Thread Structure:**
```
Tweet 1/ 🧵 I spent 6 months building an AI that mixes music. 
Here's what I learned about the future of audio production:

[Video clip of the VST working]

Link in last tweet to try it 👇

---

Tweet 2/ The problem: Mixing is the #1 bottleneck for indie musicians.

Human engineers: $200-800/track
AI mastering (LANDR): $25/mo, zero control
Logic's "Auto Mix": Destroys dynamics

We need something between automation and expertise.

---

Tweet 3/ So I built NeuralMix.

It lives inside your DAW as a VST. You upload stems, describe what you 
want in plain English, and it applies per-track FX chains.

"Make the kick punchier" → +3dB transient boost on drums stem only.

---

Tweet 4/ Technical decisions I made:

❌ Cloud processing (latency kills creativity)
✅ Local DSP with tiny on-device LLM

❌ Stereo black-box export
✅ Stem-level individual processing

❌ Subscription required
✅ One-time purchase option coming

---

Tweet 5/ The waitlist is open. Currently at #1,247.

First 500 get lifetime early-adopter pricing.

Join here: neuralmix.com

Currently working inside Ableton, Logic, FL Studio.

What DAW should we support next? 👇
```

**Engagement Tactics:**
- Quote tweet replies with additional insights
- Share audio before/after clips
- Post "day in the life" content from development
- Reply to producers asking for mixing advice

---

### Phase 4: Sustain (Week 2+)
**Goal:** Keep momentum, collect feedback, iterate

**Weekly Content:**
- Development updates ("This week's progress")
- User questions answered
- Behind-the-scenes: training the AI on stems
- Polls: "What feature do you want first?"

**Email Sequence (via Resend):**
1. **Immediate:** Welcome + "What's your biggest mixing struggle?" (reply to answer)
2. **Day 3:** "Here's how NeuralMix works under the hood" (builds trust)
3. **Day 7:** "5 mixing mistakes AI can fix instantly" (educational)
4. **Day 14:** "You're #X in line. Share to move up" (viral loop reminder)

---

## 📊 Success Metrics

### Primary KPIs
| Metric | Target | Measurement |
|--------|--------|-------------|
| Waitlist signups | 2,000 in first week | Supabase count |
| Referral rate | 30%+ share their link | referral_count > 0 |
| Reddit upvotes | 500+ on main post | Reddit analytics |
| X impressions | 100K+ | Twitter analytics |
| Email open rate | 60%+ | Resend analytics |

### Secondary KPIs
- Source attribution (which platform converts best)
- Mobile vs desktop signup ratio
- Time-to-signup (bounce rate analysis)
- Referral conversion rate (% of invites that signup)

---

## 🛡️ Risk Mitigation

### Technical Risks
| Risk | Mitigation |
|------|-----------|
| Bot attacks | Rate limiting + disposable email blocking |
| Database overload | Cached count queries, indexed columns |
| Email deliverability | Resend + proper SPF/DKIM DNS records |
| Traffic spike | Vercel Edge + Supabase free tier (500K requests) |

### Launch Risks
| Risk | Mitigation |
|------|-----------|
| Reddit bans post | Follow 9:1 rule (9 helpful comments : 1 self-promo) |
| Low engagement | Prepare 3 versions, A/B test headlines |
| Technical failure | Soft launch with 20 friends first |
| Competitor response | Emphasize differentiation (stem-level, DAW-native) |

---

## 📝 Assets Checklist

### Code Assets
- [ ] `index.html` — Landing page with co-pilot positioning
- [ ] `success.html` — Post-signup referral page  
- [ ] `supabase/schema.sql` — Database setup
- [ ] `supabase/functions/signup/index.ts` — Edge Function
- [ ] `supabase/functions/status/index.ts` — Edge Function
- [ ] `supabase/functions/total-users/index.ts` — Edge Function

### Configuration
- [ ] `vercel.json` — Deployment config
- [ ] `.env.example` — Environment variables template
- [ ] `README.md` — Setup instructions

### Marketing Assets
- [ ] OG image (1200x630) — Social share preview
- [ ] Twitter card image — X share preview
- [ ] Favicon — 32x32, 180x180 for all devices
- [ ] Screen recording (30 sec) — Reddit post asset
- [ ] Before/after audio clips — X thread assets

---

## 🎬 Execution Timeline

**Hour 0-2:** Setup & Schema
- Set up Supabase project
- Create database schema
- Deploy initial Edge Functions

**Hour 2-4:** Landing Page
- Rebuild index.html with co-pilot positioning
- Implement single-field form
- Add dynamic counter

**Hour 4-6:** Referral System
- Build post-signup page
- Implement share buttons
- Add copy-to-clipboard functionality

**Hour 6-8:** Polish & Deploy
- Configure Resend email templates
- Add OG/Twitter meta tags
- Deploy to Vercel
- Configure custom domain

**Hour 8-9:** Testing
- End-to-end flow testing
- Mobile responsiveness check
- Social meta tag validation
- Soft launch with friends

**Day 2:** Reddit Launch  
**Day 3-5:** X Launch  
**Week 2+:** Sustain & Iterate

---

## 🎯 Final Positioning Statement

**For** indie music producers and audio engineers  
**Who** struggle with expensive mixing costs and time-consuming manual workflows  
**NeuralMix** is an AI co-pilot for music mixing  
**That** provides stem-level precision using natural language control  
**Unlike** LANDR (black-box stereo export) or Logic's Auto Mix (minimal control)  
**We** work inside your DAW and give you per-track processing that sounds professional  
**So you can** release more music, faster, without sacrificing quality or control.

---

**Ready to execute. Build starts now.**
