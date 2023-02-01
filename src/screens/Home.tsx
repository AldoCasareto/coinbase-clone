import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React from 'react';
import CBButton from '../components/CBButton';

const Home = () => {
  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <ScrollView className='w-full' contentContainerStyle={{ alignItems: 'center' }}>
        <Image
          className='mt-10 h-[250px] w-[150px]'
          source={{ uri: 'https://i.imgur.com/9EEaSaS.png' }}
        />
        <Text className='text-xl font-semibold'>Welcome to CoinBase</Text>
        <Text className='mb-6 text-lg font-semibold text-gray-500'>Make your investment today</Text>
        <CBButton title='Get Started' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
