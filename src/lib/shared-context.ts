// Simple VIP context management
// Just creates a basic user context with VIP status

// Internal helper to persist context and notify listeners
function persistContext(userContext: any): void {
  localStorage.setItem('omni-user-context', JSON.stringify(userContext));
  window.dispatchEvent(new CustomEvent('userContextChanged'));
}

// Ensure a default country when none exists
function withDefaultCountry(context: any): any {
  if (!context) return { key: 'demo-regular-user', kind: 'user', country: 'GB', custom: { vipStatus: 'none' } };
  if (!context.country) {
    return { ...context, country: 'GB' };
  }
  return context;
}

// Create VIP user context
export function createVIPUserContext(): void {
  const existing = getCurrentUserContextUnsafe();
  const userContext = withDefaultCountry({
    key: 'demo-vip-user',
    kind: 'user',
    country: existing?.country || 'GB',
    custom: {
      vipStatus: 'vip'
    }
  });
  
  persistContext(userContext);
  console.log('VIP context created:', userContext);
}

// Create regular user context
export function createRegularUserContext(): void {
  const existing = getCurrentUserContextUnsafe();
  const userContext = withDefaultCountry({
    key: 'demo-regular-user',
    kind: 'user',
    country: existing?.country || 'GB',
    custom: {
      vipStatus: 'none'
    }
  });
  
  persistContext(userContext);
  console.log('Regular context created:', userContext);
}

// Set user country for targeting (e.g., GB vs BE)
export function setUserCountry(countryCode: 'GB' | 'BE'): void {
  try {
    const existing = withDefaultCountry(getCurrentUserContextUnsafe());
    const updated = { ...existing, country: countryCode };
    persistContext(updated);
    console.log('Country updated in user context:', updated);
  } catch (error) {
    console.error('Failed to set user country:', error);
  }
}

export function getCurrentCountry(): 'GB' | 'BE' {
  const ctx = withDefaultCountry(getCurrentUserContextUnsafe());
  const country = (ctx.country || 'GB') as 'GB' | 'BE';
  return country === 'BE' ? 'BE' : 'GB';
}

// Get current user context without side effects
function getCurrentUserContextUnsafe(): any | null {
  try {
    const stored = localStorage.getItem('omni-user-context');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Get current user context
export function getCurrentUserContext(): any {
  try {
    const stored = localStorage.getItem('omni-user-context');
    if (!stored) {
      // Create default regular user
      createRegularUserContext();
      return getCurrentUserContext();
    }
    return withDefaultCountry(JSON.parse(stored));
  } catch {
    createRegularUserContext();
    return getCurrentUserContext();
  }
}

// Get VIP status
export function getVIPStatus(): 'none' | 'vip' {
  const context = getCurrentUserContext();
  return context?.custom?.vipStatus || 'none';
}


