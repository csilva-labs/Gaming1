import * as LDClient from 'launchdarkly-js-client-sdk';
import { DEFAULT_FLAGS, FlagKey } from '@/types/flags';

const clientSideID = import.meta.env.VITE_LAUNCHDARKLY_CLIENT_SIDE_ID || 'demo-client-side-id';

export interface User {
  key: string;
  name?: string;
  email?: string;
  country?: string;
  custom?: Record<string, any>;
}

class LaunchDarklyService {
  private client: LDClient.LDClient | null = null;
  private initialized = false;
  private currentUser: User | null = null;

  async initialize(user: User): Promise<LDClient.LDClient> {
    // Always reset initialization when called with a new user
    // This ensures we pick up changes after page reload
    this.initialized = false;
    this.client = null;
    this.currentUser = user;

    // For demo purposes, we'll use a mock client if no real client ID is provided
    if (clientSideID === 'demo-client-side-id') {
      return this.createMockClient();
    }

    try {
      this.client = LDClient.initialize(clientSideID, user);
      await this.client.waitForInitialization(5);
      this.initialized = true;
      return this.client;
    } catch (error) {
      console.warn('LaunchDarkly initialization failed, using mock client:', error);
      return this.createMockClient();
    }
  }

  private createMockClient(): LDClient.LDClient {
    // Create a mock client for demo purposes
    const mockClient = {
      variation: (flagKey: string, defaultValue: any) => {
        // Demo variations for remaining flags
        switch (flagKey) {
          case 'vip-gaming-experience':
            // Check if user qualifies for VIP based on context
            // Read directly from localStorage to ensure we get the latest value
            try {
              const stored = localStorage.getItem('omni-user-context');
              console.log('🎯 Mock client evaluating VIP flag:');
              console.log('  - Stored context:', stored);
              
              if (stored) {
                const context = JSON.parse(stored);
                const vipStatus = context?.custom?.vipStatus;
                console.log('  - Parsed context:', context);
                console.log('  - VIP status from context:', vipStatus);
                console.log('  - Returning:', vipStatus === 'vip' ? 'vip' : 'none');
                return vipStatus === 'vip' ? 'vip' : 'none';
              }
              
              console.log('  - No stored context found, returning:', 'none');
              return 'none';
            } catch (error) {
              console.error('❌ Error reading VIP status from localStorage:', error);
              return 'none';
            }
          default:
            return DEFAULT_FLAGS[flagKey as FlagKey] ?? defaultValue;
        }
      },
      track: (eventKey: string, data?: any, metricValue?: number) => {
        console.log(`[LaunchDarkly Demo] Tracked event: ${eventKey}`, data, metricValue);
      },
      flush: () => Promise.resolve(),
      identify: (user: User) => Promise.resolve(),
      close: () => Promise.resolve(),
      on: () => {},
      off: () => {},
      allFlags: () => ({}),
      getUser: () => ({ key: 'demo-user', anonymous: true }),
      setStreaming: () => {},
      isOffline: () => false,
    } as any;

    this.client = mockClient;
    this.initialized = true;
    return mockClient;
  }

  getClient(): LDClient.LDClient | null {
    return this.client;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getUser(): User | null {
    return this.currentUser;
  }
}

export const ldService = new LaunchDarklyService();

// Tracking helper supporting optional data and metric value
export const trackEvent = (eventKey: string, dataOrMetric?: any, metricValueOptional?: number) => {
  const client = ldService.getClient();
  if (!client) return;

  // Backward compatibility: if second argument is a number and no third provided, treat it as metricValue
  if (typeof dataOrMetric === 'number' && metricValueOptional === undefined) {
    client.track(eventKey, undefined, dataOrMetric as number);
    return;
  }

  client.track(eventKey, dataOrMetric, metricValueOptional);
};

