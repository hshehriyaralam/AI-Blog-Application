export const liveRefetchOptions = {
  pollingInterval: 10000,           // every 10s
  refetchOnMountOrArgChange: true,  // when component mounts or args change
  refetchOnFocus: true,             // when tab is focused again
  refetchOnReconnect: true,         // when internet reconnects
};