import React from 'react';
  import {
    AppRegistry,
    StyleSheet,
    View,
    StatusBar,
    Platform,
    SafeAreaView
  } from 'react-native';
  import { Colors } from '../styles/Index';
  
  const StatusBarApp = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  export default StatusBarApp;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

// AppRegistry.registerComponent('App', () => DarkTheme);
