import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { STATUS_BAR_HEIGHT } from 'utils';

/**
A component to go at the top of the screen behind native status bar on different devices.
*/
export default function Statusbar() {
  return (
    <View style={{ height: STATUS_BAR_HEIGHT, zIndex: 999 }}>
      <StatusBar
        barStyle="dark-content"
        style={{
          height: STATUS_BAR_HEIGHT,
          zIndex: 999,
        }}
      />
    </View>
  );
}