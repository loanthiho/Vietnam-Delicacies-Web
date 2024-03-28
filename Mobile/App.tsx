import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import Navigation from './src/navigation';
import {STRIPE_KEY} from './src/ultils/_env';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality',
  'Each child in a list should have a unique "key" prop.',
  'ViewPropTypes will be removed from React Native, along with all other PropTypes',
  'Encountered two children with the same key',
  `Image source "null" doesn't exist`,
  'new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method',
  '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
  'Warning: Failed prop type: Invalid prop `color` supplied to `Text`:',
]);

const App = () => {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <Navigation />
          <FlashMessage position="top" />
        </StripeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
