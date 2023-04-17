import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const RotatingImage = () => {
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <TouchableOpacity onPress={() => spinValue.stopAnimation()}>
      <Animated.Image
        style={{ transform: [{ rotate: spin }], width: 200, height: 200 }}
        source={require('../../Assets/image/IconLogoBagPag.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default function App() {
  return (
    <View style={styles.container}>
      <RotatingImage />
    </View>
  );
}