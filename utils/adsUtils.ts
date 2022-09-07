import { AdMobInterstitial, AdMobRewarded } from 'expo-ads-admob';
import { ADMOB_TEST_FS, ADMOB_TEST_FS_REWARD, PERSONALIZED_ADS } from './types';

export const initAds = async () => {
  await AdMobInterstitial.setAdUnitID(ADMOB_TEST_FS);
  await AdMobRewarded.setAdUnitID(ADMOB_TEST_FS_REWARD);
  // await setTestDeviceIDAsync('EMULATOR');

  loadRewardAd();
  loadInterstitialAd();
};

export const loadRewardAd = async () => {
  const isLoaded = await AdMobRewarded.getIsReadyAsync();

  if (!isLoaded) {
    console.log('Loading Reward Ad');
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: PERSONALIZED_ADS });
    console.log('Loaded Reward Ad');
  }
};

export const showRewardAd = async (onReward: () => void, onDismiss: () => void) => {
  await loadRewardAd();

  AdMobRewarded.removeAllListeners();
  AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
    console.log('Rewarded');
    onReward();
  });
  AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
    console.log('Dismissed Reward Ad');
    loadRewardAd();
    onDismiss();
  });

  await AdMobRewarded.showAdAsync();
};

export const loadInterstitialAd = async () => {
  const isLoaded = await AdMobInterstitial.getIsReadyAsync();

  if (!isLoaded) {
    console.log('Loading Interstitial Ad');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: PERSONALIZED_ADS });
    console.log('Loaded Interstitial Ad');
  }
};

export const showInterstitialAd = async (onDismiss: () => void) => {
  await loadInterstitialAd();

  AdMobInterstitial.removeAllListeners();
  AdMobInterstitial.addEventListener('interstitialDidClose', () => {
    console.log('Dismissed Interstitial Ad');
    AdMobInterstitial.dismissAdAsync();
    loadInterstitialAd();
    onDismiss();
  });

  await AdMobInterstitial.showAdAsync();
};
