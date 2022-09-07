import { getNetworkStateAsync } from 'expo-network';

const timeoutError = Symbol('timeoutError');

const timeout = (prom : Promise<any>, time: number, exception: Symbol) => {
  let timer: NodeJS.Timeout;
  return Promise.race([
    prom,
    new Promise((res, rej) => {
      timer = setTimeout(rej, time, exception);
    }),
  ]).finally(() =>
    clearTimeout(timer));
};

export const hasInternetConnection = async () => {
  let reachable;
  try {
    const networkState = await timeout(getNetworkStateAsync(), 0, timeoutError);
    reachable = networkState.isInternetReachable ?? false;
  } catch (e) {
    reachable = false;
    console.log(e);
  }

  return reachable;
};
