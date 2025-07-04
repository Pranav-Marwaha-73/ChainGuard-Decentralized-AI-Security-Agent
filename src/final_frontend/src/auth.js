import { AuthClient } from "@dfinity/auth-client";

export const initAuth = async () => {
  const authClient = await AuthClient.create();

  // Check if already authenticated
  if (!authClient.isAuthenticated()) {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize", // NNS Wallet identity provider
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1_000_000_000), // 7 days
      onSuccess: () => {
        console.log("✅ Logged in!");
        window.location.reload(); // refresh on login
      },
    });
  }

  return authClient;
};

export const logout = async (authClient) => {
  await authClient.logout();
  window.location.reload();
};
