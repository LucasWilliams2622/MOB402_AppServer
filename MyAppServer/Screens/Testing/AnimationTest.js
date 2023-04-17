import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    Animated.loop(
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  render() {
    const interpolateRotation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View
        style={{
          transform: [{ rotate: interpolateRotation }],
          width: 200,
          height: 200,
          backgroundColor: 'red',
        }}
      />
    );
  }
}
