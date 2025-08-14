import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { VIPExperience } from '@/components/VIPExperience';
import { createVIPUserContext, createRegularUserContext, setUserCountry, getCurrentUserContext } from '@/lib/shared-context';
import navData from '@/data/nav.json';
import { useFlag } from '@/contexts/LaunchDarklyContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const vipVariant = useFlag('vip-gaming-experience', 'none');
  const currentVIPStatus = vipVariant;
  const [country, setCountryState] = useState<'GB' | 'BE'>(() => {
    const ctx = getCurrentUserContext();
    return (ctx?.country === 'BE' ? 'BE' : 'GB');
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignUp = () => {
    console.log('VIP Sign Up clicked');
    console.log('Current VIP status before signup:', currentVIPStatus);
    createVIPUserContext();
    console.log('VIP context created, reloading page...');
    window.location.reload();
  };
  
  const handleLogout = () => {
    console.log('VIP Logout clicked');
    console.log('Current VIP status before logout:', currentVIPStatus);
    createRegularUserContext();
    console.log('Regular context created, reloading page...');
    window.location.reload();
  };

  const handleCountryChange = (next: 'GB' | 'BE') => {
    setCountryState(next);
    setUserCountry(next);
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled 
      ? 'bg-gaming-navy/95 backdrop-blur-md border-b border-gaming-navy-lighter' 
      : 'bg-transparent'
    }
  `;

  return (
    <>
      <header className={headerClasses} data-testid="main-header">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-2xl font-bold text-gaming-gold">
              DEMO<span className="text-foreground">1</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navData.main.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-foreground hover:text-gaming-gold transition-colors duration-200 font-medium"
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* VIP Sign Up / Logout Button */}
            <div className="hidden md:flex items-center space-x-4">
              {currentVIPStatus === 'vip' ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-primary-foreground"
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  onClick={handleSignUp}
                  size="sm"
                  className="bg-gaming-gold hover:bg-gaming-gold/90 text-primary-foreground font-semibold"
                >
                  👑 VIP Sign Up
                </Button>
              )}
              
              {/* Country Targeting Toggle */}
              <select 
                className="bg-transparent border border-gaming-navy-lighter rounded px-2 py-1 text-sm text-foreground"
                value={country}
                onChange={(e) => handleCountryChange(e.target.value as 'GB' | 'BE')}
                title="Market"
              >
                <option value="GB">UK</option>
                <option value="BE">Belgium</option>
              </select>

              {/* Language Toggle */}
              <select 
                className="bg-transparent border border-gaming-navy-lighter rounded px-2 py-1 text-sm text-foreground"
                defaultValue="en"
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="nl">NL</option>
              </select>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-gaming-navy border-gaming-navy-lighter">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="text-lg font-bold text-gaming-gold mb-4">
                    DEMO1
                  </div>
                  {navData.main.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className="text-foreground hover:text-gaming-gold transition-colors duration-200 text-lg font-medium"
                      data-testid={`mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </a>
                  ))}
                  
                  {/* Mobile VIP Button */}
                  <div className="pt-4 border-t border-gaming-navy-lighter">
                    {currentVIPStatus === 'vip' ? (
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-gaming-gold text-gaming-gold hover:bg-gaming-gold hover:text-primary-foreground"
                      >
                        Log Out
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSignUp}
                        className="w-full bg-gaming-gold hover:bg-gaming-gold/90 text-primary-foreground font-semibold"
                      >
                        👑 VIP Sign Up
                      </Button>
                    )}
                  </div>
                  
                  {/* Mobile Country Selector */}
                  <div className="pt-4 border-t border-gaming-navy-lighter">
                    <select 
                      className="bg-gaming-navy-light border border-gaming-navy-lighter rounded px-3 py-2 text-foreground w-full"
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value as 'GB' | 'BE')}
                      title="Market"
                    >
                      <option value="GB">United Kingdom</option>
                      <option value="BE">Belgium</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-gaming-navy-lighter">
                    <select 
                      className="bg-gaming-navy-light border border-gaming-navy-lighter rounded px-3 py-2 text-foreground w-full"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="nl">Nederlands</option>
                    </select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* VIP Banner - Compact version */}
      <VIPExperience />
    </>
  );
};

export default Header;