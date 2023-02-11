import { View, Text, Image, TouchableHighlight, Animated } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { onPressIn, onPressOut } from '../utils/animations';

type NewslistItemsProps = {
  newsOutlet: string;
  date: string;
  title: string;
  image: string;
  url: string;
};

const NewsItem = ({ newsOutlet, date, title, image, url }: NewslistItemsProps) => {
  console.log(`image = `, image);
  const animatedValue = new Animated.Value(1);
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  const handleNewsPress = async (url: string) => {
    await WebBrowser.openBrowserAsync(url, {
      readerMode: true,
      controlsColor: 'blue',
      dismissButtonStyle: 'close',
      toolbarColor: 'white',
    });
  };

  return (
    <View className='my-2 border-b border-gray-200'>
      <TouchableHighlight
        onPressIn={() => onPressIn(animatedValue)}
        onPressOut={() => onPressOut(animatedValue)}
        underlayColor='#FAFBFE'
        onPress={() => handleNewsPress(url)}
      >
        <Animated.View style={animatedStyle} className='flex-row items-center justify-between'>
          <View className='w-3/4 '>
            <Text className='text-lg'>
              {newsOutlet} <Text className='text-xl font-bold'>∙ </Text>
              {date}
            </Text>
            <Text selectable className='mb-3 font-bold leading-6'>
              {title}
            </Text>
          </View>
          <Image source={{ uri: image }} className='h-16 w-16 rounded-lg' />
        </Animated.View>
      </TouchableHighlight>
    </View>
  );
};

export default NewsItem;
