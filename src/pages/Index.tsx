import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NewsGrid from '@/components/NewsGrid';
import Section from '@/components/Section';
import ContactCallout from '@/components/ContactCallout';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import ResponsibleGamingBanner from '@/components/ResponsibleGamingBanner';
import VideoModal from '@/components/VideoModal';

import astronautDice from '@/assets/astronaut-dice.jpg';
import casinoRoulette from '@/assets/casino-roulette.jpg';

const Index = () => {
  const sectionOrder = 'who-first';
  const showCareers = true;
  
  // Section content
  const whoWeAreSection = (
    <Section
      id="who-we-are"
      kicker="This is us"
      title="Who we are"
      description="The Demo1 Group is a leader in the regulated gaming market, providing innovative casino and sports betting experiences. We aim to become a global reference in regulated online gaming markets through our proprietary technology and omnichannel approach."
      ctaText="Get to know us"
      ctaHref="/who-we-are"
      image={astronautDice}
      imageAlt="Gaming technology illustration"
      className="bg-background"
    />
  );

  const whatWeDoSection = (
    <VideoModal
      triggerImage={casinoRoulette}
      triggerAlt="Gaming platform technology"
      videoTitle="In pursuit of next level entertainment"
    />
  );

  const whatWeDoSectionWrapper = (
    <section className="py-24 bg-gaming-navy-light">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 fade-in-up">
            <div className="space-y-6">
              <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase">
                In pursuit of next level entertainment
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                What we do
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Drawing on experience from our own gaming operations, Demo1 offers a comprehensive technology platform for operating casino websites and online sports betting. We provide end-to-end gaming solutions including casinos, sports betting, poker, and bingo.
              </p>
            </div>
            
            <div className="flex items-center text-gaming-gold text-lg font-medium group cursor-pointer">
              How we can help you
              <svg className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="fade-in-up delay-1">
            {whatWeDoSection}
          </div>
        </div>
      </div>
    </section>
  );

  const careersSection = showCareers ? (
    <section className="py-24 bg-background" data-testid="careers-section">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8 fade-in-up">
          <div className="space-y-6">
            <p className="text-gaming-gold font-semibold text-lg tracking-wide uppercase">
              Careers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Join our team
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Be part of the next generation of gaming technology. We're always looking for talented individuals who share our passion for innovation and responsible gaming.
            </p>
          </div>
          
          <button className="inline-flex items-center text-gaming-gold text-lg font-medium group cursor-pointer hover:text-gaming-gold-dark transition-colors">
            Join us
            <svg className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  ) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <ResponsibleGamingBanner />
      
      <main>
        <Hero />
        <NewsGrid />
        
        {sectionOrder === 'who-first' ? (
          <>
            {whoWeAreSection}
            {whatWeDoSectionWrapper}
          </>
        ) : (
          <>
            {whatWeDoSectionWrapper}
            {whoWeAreSection}
          </>
        )}
        
        {careersSection}
        <ContactCallout />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
