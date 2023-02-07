import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CBButton from '../components/CBButton';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../App';
import Watchlist from '../components/Watchlist';
import { fetchCoinData, WatchlistState } from '../store/features/watchlistSlice';
import { RootState } from '../store/store';

const Home = () => {
  const watchlist = useSelector((state: RootState) => state.watchlist);
  const dispatch = useDispatch<AppDispatch>();

  console.log('data', watchlist.watchListData);
  console.log('loading', watchlist.isLoading);

  const loadData = async () => {
    try {
      await dispatch(fetchCoinData());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  });

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
        {watchlist.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Watchlist coinData={watchlist.watchListData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
