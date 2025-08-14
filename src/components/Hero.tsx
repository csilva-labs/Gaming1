import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-gaming.jpg';
import { useFlag } from '@/contexts/LaunchDarklyContext';
import { trackEvent } from '@/lib/launchdarkly';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // VIP detection via LaunchDarkly flag
  const vipVariant = useFlag('vip-gaming-experience', 'none');
  const isVIP = vipVariant === 'vip';

  // AB test variant
  const uiVariant = useFlag('ui.variant', 'control');

  // Optional string overrides from LaunchDarkly
  const heroTitleOverride = useFlag('copy.heroTitle', '');
  const heroSubtitleOverride = useFlag('copy.heroSubtitle', '');
  const heroPrimaryCtaOverride = useFlag('copy.heroPrimaryCta', '');

  // Fire an exposure event once when the variant is determined
  useEffect(() => {
    trackEvent('hero_exposure', { variant: uiVariant, vip: isVIP });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiVariant]);

  // Regular hero content
  const regularSlides: HeroSlide[] = [
    {
      id: 'slide1',
      title: 'We are Demo1',
      subtitle: 'Next level',
      description: 'With 30 years\' experience, Demo1 is a leader on the game of chance market. We offer a unique omnichannel experience based on a responsible approach.',
      image: heroImage,
    },
    {
      id: 'slide2', 
      title: 'Technology Platform',
      subtitle: 'Gaming Excellence',
      description: 'Drawing on experience from our own casinos, we offer comprehensive technology platforms for online gaming operations.',
      image: heroImage,
    }
  ];

  // VIP-focused hero content
  const vipSlides: HeroSlide[] = [
    {
      id: 'slide1',
      title: 'Exclusive VIP Gaming',
      subtitle: 'Elite Experience',
      description: 'Welcome to your exclusive VIP gaming experience! Enjoy premium features, personalized service, and the highest level of gaming excellence with 30 years of industry expertise.',
      image: heroImage,
    },
    {
      id: 'slide2', 
      title: 'VIP Technology Platform',
      subtitle: 'Premium Gaming Excellence',
      description: 'Experience our cutting-edge VIP gaming platform designed for discerning players. Advanced features, enhanced rewards, and personalized gaming experiences await our VIP members.',
      image: heroImage,
    },
    {
      id: 'slide3',
      title: 'VIP Member Benefits',
      subtitle: 'Exclusive Rewards',
      description: 'Unlock exclusive VIP benefits including priority support, enhanced bonuses, personalized gaming recommendations, and access to premium gaming content only available to VIP members.',
      image: heroImage,
    }
  ];

  // Use VIP slides if user is VIP, otherwise use regular slides
  const slides = isVIP ? vipSlides : regularSlides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCTAClick = () => {
    // Send click event with A/B variant
    trackEvent('hero_cta_click', { variant: uiVariant, vip: isVIP });

    if (isVIP) {
      console.log('VIP CTA clicked');
    } else {
      console.log('Regular CTA clicked');
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];
  const displayTitle = heroTitleOverride || currentSlideData.title;
  const displaySubtitle = heroSubtitleOverride || currentSlideData.subtitle;
  const displayPrimaryCta = heroPrimaryCtaOverride || (isVIP ? 'Explore VIP Features' : 'Learn more');

  // Variant-based CTA styling (A/B test)
  const ctaClassName = `bg-gaming-gold hover:bg-gaming-gold/90 text-primary-foreground font-semibold px-8 py-4 text-lg ${
    uiVariant === 'bold' ? 'text-xl py-5 shadow-lg' : ''
  }`;

  return (
    <section 
      className="min-h-screen relative gaming-hero-bg overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-gaming-navy/60" />
      </div>

      <div className={`relative z-10 container mx-auto px-6 pb-16 ${isVIP ? 'pt-40' : 'pt-32'}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {isVIP && <div className="text-3xl">👑</div>}
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {displayTitle}
                </h1>
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold text-gaming-gold">
                {displaySubtitle}
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
              {currentSlideData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleCTAClick}
                size="lg"
                className={ctaClassName}
              >
                {displayPrimaryCta}
              </Button>
              {isVIP && (
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-primary-foreground font-semibold px-8 py-4 text-lg"
                >
                  VIP Dashboard
                </Button>
              )}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-gaming-gold' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;