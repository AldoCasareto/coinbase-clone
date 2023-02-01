import { Animated } from 'react-native';

export const onPressIn = (animatedValue: Animated.Value) => {
  Animated.spring(animatedValue, {
    toValue: 0.9,
    useNativeDriver: true,
  }).start();
};

export const onPressOut = (animatedValue: Animated.Value) => {
  Animated.spring(animatedValue, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
};
