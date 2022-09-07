import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdMobBanner } from 'expo-ads-admob';
import { GridPage } from './components/grid/gridPage/GridPage';
import { MenuPage } from './components/menu/MenuPage';
import { BasicInstructionsPage } from './components/instruction/BasicInstructionsPage';
import { LevelsPage } from './components/levels/LevelsPage';
import { GridPageLevel } from './components/grid/gridPage/GridPageLevel';
import {
  ADMOB_TEST_BANNER, ADS_ENABLED, hasInternetConnection, initAds, PERSONALIZED_ADS, vw,
} from './utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

// https://github.com/expo/expo/issues/3874
StatusBar.setBarStyle('dark-content');
if (Platform.OS === 'android') {
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor('transparent');
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [adsInitialized, setAdsInitialized] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(false);

  useEffect(() => {
    if (ADS_ENABLED) {
      initAdMob();
    }
  }, []);

  const initAdMob = async () => {
    const hasInternet = await hasInternetConnection();
    setIsInternetReachable(hasInternet);
    await initAds();
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MenuPage"
            component={MenuPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GridPage"
            component={GridPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GridPageLevel"
            component={GridPageLevel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LevelsPage"
            component={LevelsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BasicInstructionPage"
            component={BasicInstructionsPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {ADS_ENABLED && (
        <View>
          <AdMobBanner
            style={{ display: adsInitialized ? undefined : 'none' }}
            adUnitID={ADMOB_TEST_BANNER} // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds={PERSONALIZED_ADS}
            onAdViewDidReceiveAd={() =>
              setAdsInitialized(true)}
          />
          {(!isInternetReachable && !adsInitialized)
        && (
          <Image
            style={{ resizeMode: 'contain', height: vw(15), width: vw(100) }}
            source={require('./assets/ads/offline-banner.png')}
          />
        )}
        </View>
      )}
    </View>
  );
}
