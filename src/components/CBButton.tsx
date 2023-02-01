import { View, Text, TouchableHighlight, Animated } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import { onPressIn, onPressOut } from '../utils/animations';

type CBButtonProps = {
  title: string;
};

const CBButton = ({ title }: CBButtonProps) => {
  const animatedValue = new Animated.Value(1);
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <Animated.View style={animatedStyle} className='w-10/12 rounded-xl bg-[#0053f8]'>
      <TouchableHighlight
        className='rounded-xl'
        onPressIn={() => onPressIn(animatedValue)}
        onPressOut={() => onPressOut(animatedValue)}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <View className='w-full rounded-xl bg-[#0053f8] p-4'>
          <Text className=' text-center text-lg font-bold text-white'>{title}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default CBButton;
