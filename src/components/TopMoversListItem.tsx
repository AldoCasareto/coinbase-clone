import { View, Text, TouchableHighlight, Image, Animated } from 'react-native';
import React from 'react';
import { onPressIn, onPressOut } from '../utils/animations';
import * as Haptics from 'expo-haptics';

type TopMoversListsItemsProps = {
  id: number;
  symbol: string;
  price: number;
  percentChange: number;
};

const TopMoversListItem = ({ id, symbol, price, percentChange }: TopMoversListsItemsProps) => {
  const animatedValue = new Animated.Value(1);
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <TouchableHighlight
      onPressIn={() => onPressIn(animatedValue)}
      onPressOut={() => onPressOut(animatedValue)}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
      underlayColor='#FAFBFE'
      className='rounded-lg border border-gray-200'
    >
      <Animated.View style={animatedStyle}>
        <View className='flex-row items-center space-x-1 rounded-lg p-2'>
          <Image
            className='h-10 w-10'
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png`,
            }}
          />
          <View>
            <View className='flex-row space-x-2'>
              <Text className='text-lg font-bold'>{symbol}</Text>
              <Text className='text-lg underline'>
                USD${' '}
                {price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
            <Text
              className={`${
                percentChange > 0 ? 'text-green-400' : 'text-red-600'
              } text-right text-xl font-bold`}
            >
              {percentChange > 0 && '+'}
              {percentChange.toFixed(2)}%
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableHighlight>
  );
};

export default TopMoversListItem;
