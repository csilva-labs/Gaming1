import React from 'react';
import { Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlag } from '@/contexts/LaunchDarklyContext';

interface ResponsibleGamingBannerProps {
  onClose?: () => void;
}

const ResponsibleGamingBanner: React.FC<ResponsibleGamingBannerProps> = ({ onClose }) => {
  const showBanner = useFlag('market.showResponsibleGamingBanner', false);
  const bannerMessage = useFlag('market.responsibleGamingMessage', 'We are committed to promoting safe and responsible gaming practices.');
  const bannerLink = useFlag('market.responsibleGamingLinkUrl', 'https://www.begambleaware.org/');

  if (!showBanner) return null;

  return (
    <div 
      className="fixed top-20 left-0 right-0 z-40 bg-gaming-gold text-gaming-navy py-3 px-6 shadow-lg"
      data-testid="responsible-gaming-banner"
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="h-5 w-5" />
          <p className="font-medium text-sm">
            <span className="font-semibold">Responsible Gaming:</span> {bannerMessage}
            <a href={bannerLink} className="underline ml-1 hover:no-underline" target="_blank" rel="noreferrer">
              Learn more
            </a>
          </p>
        </div>
        
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gaming-navy hover:bg-gaming-navy/10 p-1"
            data-testid="close-responsible-gaming-banner"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResponsibleGamingBanner;