# Design Brief

## Tone & Purpose
Spiritual, welcoming community platform. Warm, accessible, deeply intentional — not corporate, not playful, genuinely inviting and calm for church prayer request submission and admin management.

## Differentiation
Structural zone elevation with intentional depth: header with bottom border accent, card-based request list with hover elevation, sidebar with warm amber active state, footer with muted background. Motion is restrained and purposeful.

## Color Palette

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| primary | `L 0.55 C 0.15 H 220` (teal) | `L 0.72 C 0.18 H 50` (amber) | Primary actions, active states, trust |
| accent | `L 0.72 C 0.18 H 50` (amber) | `L 0.75 C 0.16 H 50` (warm amber) | Highlights, hope, sacred light |
| destructive | `L 0.55 C 0.22 H 25` (soft red) | `L 0.65 C 0.19 H 22` (coral) | Delete, destructive actions |
| background | `L 0.97 C 0.01 H 40` (cream) | `L 0.12 C 0.03 H 220` (deep teal) | Page background |
| card | `L 0.98 C 0.01 H 40` (off-white) | `L 0.16 C 0.04 H 220` (teal-dark) | Card surfaces, elevated zones |
| sidebar | `L 0.15 C 0.08 H 220` (deep teal) | `L 0.12 C 0.04 H 220` (deeper teal) | Navigation background |

## Typography
- **Display/Body**: DM Sans (clean, modern, accessible, warm personality)
- **Mono**: JetBrains Mono (technical elements, consistent legibility)
- **Scale**: h1 2.5rem, h2 2rem, h3 1.5rem, body 1rem, small 0.875rem

## Elevation & Depth
- **Background**: Soft cream (light) / deep teal (dark), neutral warmth
- **Cards**: Subtle shadow `shadow-card` on hover, `shadow-card-hover` (0 4px 16px, 12% opacity)
- **Sidebar**: Deep contrasting background, light text, amber accent for active
- **Borders**: Soft warm grays, no harsh lines, `border-border` throughout

## Structural Zones
| Zone | Light | Dark | Treatment |
|------|-------|------|-----------|
| Header | `bg-card border-b border-border` | `bg-card border-b border-sidebar-border` | Clean top section with subtle divider |
| Main Content | `bg-background` | `bg-background` | Open, breathing space |
| Cards | `bg-card shadow-card transition-smooth hover:shadow-card-hover` | `bg-card shadow-card` | Elevated with smooth hover effect |
| Sidebar Nav | `bg-sidebar text-sidebar-foreground` | `bg-sidebar text-sidebar-foreground` | Deep color, light text, accent highlight |
| Active Nav Item | `bg-sidebar-accent text-sidebar-accent-foreground` | `bg-sidebar-accent text-sidebar-accent-foreground` | Warm amber highlight |
| Footer | `bg-muted border-t border-border` | `bg-muted border-t border-sidebar-border` | Muted background with top border |

## Spacing & Rhythm
- **Base unit**: 0.25rem (4px)
- **Margin/padding scale**: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem
- **Card padding**: 1.5rem
- **Section gap**: 2rem–3rem
- **Dense list items**: 1rem padding

## Component Patterns
- **Buttons**: Primary (teal), secondary (transparent), destructive (soft red), loading states with fade
- **Forms**: Labeled inputs, focus ring on primary color, error text in destructive color
- **Cards**: Rounded corners (12px), consistent padding, hover elevation on interactive cards
- **Status badge**: `bg-primary/10 text-primary` (Pending), `bg-accent/10 text-accent` (Prayed)
- **Empty states**: Centered, muted text, 3rem icon, no harsh messaging

## Motion & Animation
- **Transitions**: `transition-smooth` (0.3s cubic-bezier) on all interactive elements
- **Entrance**: `animate-fade-in` (0.3s), `animate-slide-up` (0.3s) for card/modal appearance
- **Hover**: Lift with `shadow-card-hover`, color shift on buttons
- **Loading**: Subtle pulse, not aggressive bouncing
- **Choreography**: Cascade enter for lists, stagger 50–100ms between items

## Constraints
- No harsh borders, prefer soft shadows for depth
- No full-page gradients, prefer layered surface elevation
- No bright neons or saturated colors, maintain spiritual warmth
- Avoid serif fonts except when explicitly using Fraunces for display
- All color values via CSS tokens, never raw hex or RGB

## Signature Detail
Warm amber accent sparingly used as active state and CTAs, creating moments of sacred light against deep teal and cream neutrals. Gradient heading (`gradient-heading` class) on hero for subtle visual interest. Soft rounded corners (12px) throughout for approachable, inviting feel.
