import { AuthClient } from '@dfinity/auth-client';

// Internet Identity URL for mainnet
const II_URL = 'https://identity.ic0.app';

// Days until the delegation expires
const MAX_TIME_TO_LIVE = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000); // 7 days in nanoseconds

let authClient = null;

export const initAuth = async () => {
  try {
    authClient = await AuthClient.create({
      idleOptions: {
        disableIdle: true,
        disableDefaultIdleCallback: true
      }
    });
    
    return authClient;
  } catch (error) {
    console.error('Failed to initialize auth client:', error);
    throw error;
  }
};

export const login = async () => {
  if (!authClient) {
    authClient = await initAuth();
  }

  return new Promise((resolve, reject) => {
    authClient.login({
      identityProvider: II_URL,
      maxTimeToLive: MAX_TIME_TO_LIVE,
      onSuccess: () => {
        console.log('Login successful');
        resolve(authClient);
      },
      onError: (error) => {
        console.error('Login failed:', error);
        reject(error);
      },
    });
  });
};

export const logout = async () => {
  if (authClient) {
    await authClient.logout();
    authClient = null;
  }
};

export const getIdentity = () => {
  if (authClient) {
    return authClient.getIdentity();
  }
  return null;
};

export const isAuthenticated = () => {
  if (authClient) {
    return authClient.isAuthenticated();
  }
  return false;
};

export const getPrincipal = () => {
  const identity = getIdentity();
  if (identity) {
    return identity.getPrincipal().toString();
  }
  return null;
};