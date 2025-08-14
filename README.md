# Gaming1 Demo - LaunchDarkly Integration

A production-quality demo web application that recreates the Gaming1 homepage with LaunchDarkly feature flags integration for A/B testing and gradual rollouts demonstration.

> **⚠️ Demo Disclaimer**: This is a demonstration website created for LaunchDarkly presentation purposes only. It does not use Gaming1's actual branding, images, or proprietary content.

## 🎯 Project Overview

This demo showcases how Gaming1 could leverage LaunchDarkly to:
- Run A/B tests on critical UI components
- Gradually roll out new features
- Target specific user segments
- Track experiment metrics and conversions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Modern web browser

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd gaming1-demo

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Environment Variables

Create a `.env.local` file:

```bash
VITE_LAUNCHDARKLY_CLIENT_SIDE_ID=your_client_side_id
VITE_WEBSITE_DOMAIN=localhost:5173
VITE_GAMING_DOMAIN=localhost:5174
```

See `docs/launchdarkly.md` for full setup and flag creation steps. The app falls back to a mock client if the key is not set.

## 🎮 Feature Flags & Experiments

### Omni-Channel Integration

This demo showcases how Gaming1 can implement omni-channel experimentation using LaunchDarkly:

**Shared User Context**: User data and engagement metrics are shared between the website and gaming app using a persistent context system stored in localStorage.

**Cross-Platform Targeting**: Feature flags can target users based on their behavior across both platforms:
- Website engagement (pages visited, CTA clicks, games viewed)
- Gaming engagement (games played, spins, wagered amount, session duration)
- User segments (new-user, low-engagement, medium-engagement, high-engagement)

**Example Use Cases**:
- Show different UI variants to high-engagement users
- Adjust game economy based on website behavior
- Target users who viewed specific games on the website
- Personalize gaming experience based on CTA click history

### Currently Implemented Flags

| Flag Key | Purpose | Variations | Default |
|----------|---------|------------|---------|
| `hero.variant` | A/B test hero messaging | A, B, C | A |
| `hero.cta-text` | Test CTA button copy | "Learn more", "See platform", "Get in touch" | "Learn more" |
| `news.layout` | Grid vs carousel layout | "grid", "carousel" | "grid" |
| `who.section-order` | Section ordering test | "who-first", "what-first" | "who-first" |
| `careers.show` | Show/hide careers section | true, false | true |
| `cookie.banner` | Cookie consent banner | true, false | true |
| `video.modal` | Video modal functionality | true, false | true |
| `contact.banner-gradient` | Contact banner styling | true, false | true |
| `regulatory.duty-of-care-banner` | Responsible gaming banner | true, false | false |
| `nav.dark-on-scroll` | Navigation scroll effect | true, false | true |
| `games.advanced-search` | Advanced search functionality | true, false | true |
| `games.recommended` | Show recommended games section | true, false | true |
| `games.new-layout` | New grid layout for games | true, false | false |
| `ui.variant` | Gaming UI variant (control/bold) | 'control', 'bold' | 'control' |
| `theme.name` | Gaming theme (classic/neon) | 'classic', 'neon' | 'classic' |
| `economy.spinCost` | Cost per spin | number | 10 |
| `economy.rtpTarget` | Return to player target | number | 0.92 |
| `features.dailyBonus` | Enable daily bonus feature | true, false | true |
| `features.confettiOnWin` | Enable confetti on wins | true, false | true |
| `copy.spinCta` | Spin button text | string | 'Spin Now' |
| `rng.seedFromFlag` | RNG seed for deterministic demos | string | '' |

### Event Tracking

The application automatically tracks these events:
- `cta_click` - Primary conversion metric
- `video_play` - Video engagement
- `contact_click` - Contact intent
- `card_click` - Content engagement  
- `lead_submitted` - Lead generation

## 📊 Running Experiments

### Example: Hero A/B Test

1. **Hypothesis**: Changing hero messaging will improve click-through rates
2. **Variations**:
   - Control (A): "Next level entertainment"
   - Treatment (B): "Revolutionary gaming"
   - Treatment (C): "Leading the future in technology"
3. **Primary Metric**: `cta_click` events
4. **Success Criteria**: 20% improvement in CTA clicks

### Demo Experience

- **Flag Variations**: Change randomly on page refresh for demo purposes
- **Event Tracking**: View in browser console (opens with `[LaunchDarkly Demo]` prefix)
- **Component Identification**: All components include `data-testid` attributes for easy experiment setup

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with gaming theme customizations
- **Routing**: React Router v6
- **Feature Flags**: LaunchDarkly JavaScript SDK
- **Icons**: Lucide React

### Project Structure

```
src/
├── assets/          # Generated gaming-themed images
├── components/      # Reusable UI components
│   ├── ui/         # Base shadcn components
│   ├── Header.tsx  # Navigation with flag-controlled features
│   ├── Hero.tsx    # Hero section with A/B variants
│   ├── NewsGrid.tsx # News section with layout toggle
│   ├── SlotMachine.tsx # Interactive gaming demo
│   ├── Reels.tsx   # Slot machine reels component
│   ├── Paytable.tsx # Game paytable display
│   ├── SessionMetrics.tsx # Gaming session analytics
│   └── ...
├── contexts/        # LaunchDarkly React context
├── data/           # Mock data (news, navigation, offices)
├── lib/            # Utilities and LaunchDarkly service
│   ├── shared-context.ts # Omni-channel user context system
│   ├── game-logic.ts # Slot machine game logic
│   └── ...
├── pages/          # Route components
├── types/          # TypeScript type definitions
└── hooks/          # Custom React hooks
```

### Design System

The project implements a comprehensive gaming-themed design system:

- **Colors**: Gaming gold (`#D4A853`) and navy (`#1A2332`) palette
- **Components**: Custom variants for all UI elements
- **Animations**: Subtle fade-in and hover effects
- **Responsive**: Mobile-first design approach

## 🎨 Design & Branding

### Visual Identity
- **Primary Color**: Gaming Gold (#D4A853)
- **Background**: Deep Navy (#1A2332) 
- **Accents**: Gradient overlays and subtle animations
- **Typography**: Modern sans-serif with clear hierarchy

### Image Assets
All images are AI-generated neutral placeholders:
- Hero gaming platform illustration
- Abstract astronaut with dice
- Casino roulette concept
- News article thumbnails

## 📱 Pages & Features

### Homepage (`/`)
- **Header**: Responsive navigation with language toggle
- **Hero**: Rotating carousel with flag-controlled variants
- **News**: Grid/carousel toggle via feature flag
- **Who We Are**: Company introduction section
- **What We Do**: Interactive video modal (flag-controlled)
- **Careers**: Show/hide via feature flag
- **Contact**: Gradient callout with flag styling
- **Footer**: Multi-column with office locations

### Additional Pages
- `/news` - News article listing
- `/contact` - Contact form with event tracking
- `/who-we-are` - Company information
- `/what-we-do` - Services overview  
- `/work-with-us` - Careers page
- `/games` - Casino games showcase with search and filtering
- `/gaming` - Interactive slot machine demo with omni-channel context

### Interactive Elements
- **Cookie Banner**: GDPR-style consent (flag-controlled)
- **Responsible Gaming Banner**: Regulatory compliance (targeted)
- **Video Modals**: Engagement tracking
- **Form Tracking**: Lead submission events
- **Games Search**: Advanced filtering and search functionality (flag-controlled)
- **Game Cards**: Interactive game selection with hover effects
- **Slot Machine**: Interactive gaming demo with real-time flag control
- **Omni-Channel Context**: Shared user data between website and gaming app

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

### Adding New Feature Flags

1. **Define in LaunchDarkly service** (`src/lib/launchdarkly.ts`):
```typescript
export const flagDefaults = {
  'new-feature': false,
  // ... existing flags
};
```

2. **Use in components**:
```typescript
import { useFlag } from '@/contexts/LaunchDarklyContext';

const MyComponent = () => {
  const newFeatureEnabled = useFlag('new-feature', false);
  
  return (
    <div data-testid="my-component">
      {newFeatureEnabled && <NewFeature />}
    </div>
  );
};
```

3. **Add event tracking**:
```typescript
import { trackEvent } from '@/lib/launchdarkly';

const handleClick = () => {
  trackEvent('new_feature_click', { feature: 'new-feature' });
};
```

## 📈 Analytics & Metrics

### Conversion Tracking
- **Primary**: CTA clicks across all sections
- **Secondary**: Contact form submissions  
- **Engagement**: Video plays, news card clicks
- **Navigation**: Page views, scroll depth

### Event Data Structure
```typescript
// Example event payload
{
  eventKey: 'cta_click',
  data: {
    location: 'hero',
    variant: 'B',
    timestamp: Date.now()
  }
}
```

## 🧪 Testing

### Feature Flag Testing

```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { LaunchDarklyProvider } from '@/contexts/LaunchDarklyContext';

test('shows careers section when flag enabled', () => {
  render(
    <LaunchDarklyProvider>
      <HomePage />
    </LaunchDarklyProvider>
  );
  
  expect(screen.getByTestId('careers-section')).toBeInTheDocument();
});
```

### Manual Testing Checklist
- [ ] All feature flags toggle correctly
- [ ] Event tracking fires in console
- [ ] Responsive design works on mobile
- [ ] Accessibility features function
- [ ] Performance meets targets (90+ Lighthouse)

## 🚀 Deployment

### Production Considerations
1. **Environment Variables**: Set real LaunchDarkly keys
2. **User Context**: Implement actual user identification
3. **Error Handling**: Add comprehensive error boundaries
4. **Performance**: Implement code splitting and lazy loading
5. **SEO**: Add structured data and meta tags
6. **Monitoring**: Set up application performance monitoring

### LaunchDarkly Configuration
1. Create flags in LaunchDarkly dashboard
2. Set up experiments with proper targeting
3. Configure metrics and goals
4. Set up alerts for flag changes
5. Document flag lifecycle and cleanup schedules

## 📚 Documentation

- **[LaunchDarkly Integration Guide](docs/launchdarkly.md)** - Detailed flag documentation
- **Component API**: Each component includes TypeScript interfaces
- **Design System**: Documented in Tailwind config and CSS variables

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation as needed
4. Submit pull request with detailed description
5. Ensure CI passes and get approval

### Code Standards
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with React hooks rules
- **Formatting**: Prettier with standardized config
- **Naming**: Descriptive variables and clear component props

## 🛠️ Troubleshooting

### Common Issues
1. **Flags not updating**: Check flag key spelling and client initialization
2. **Events not tracking**: Verify LaunchDarkly client is initialized
3. **Images not loading**: Check import paths in components
4. **Build errors**: Run `npm run typecheck` for detailed errors

### Debug Mode
```typescript
// Enable in development
localStorage.setItem('ld-debug', 'true');
```

## 📄 License & Legal

This project is for demonstration purposes only:
- Uses neutral placeholder content and images
- Does not include Gaming1 proprietary assets
- Created for LaunchDarkly presentation purposes
- Not intended for commercial use

## 🎯 Next Steps

### Potential Enhancements
- [ ] Add more sophisticated user segmentation
- [ ] Implement server-side flag evaluation
- [ ] Add real-time metrics dashboard
- [ ] Create automated flag management workflow
- [ ] Add internationalization support
- [ ] Implement progressive web app features

---

**Built with ❤️ for LaunchDarkly demonstrations**
