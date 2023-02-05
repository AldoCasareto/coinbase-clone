import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CBButton from '../components/CBButton';
import { useSelector, useDispatch } from 'react-redux';
import { WatchlistState } from '../store/reducers/watchlist';
import * as watchlistActions from '../store/actions/watchlist';
import { AppDispatch } from '../../App';
import Watchlist from '../components/Watchlist';

type RootState = {
  watchlist: WatchlistState;
};

const Home = () => {
  const watchlistData = useSelector((state: RootState) => state.watchlist.watchListData);
  const dispatch = useDispatch<AppDispatch>();

  const loadData = () => {
    try {
      dispatch(watchlistActions.fetchCoinData());
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
        <Watchlist coinData={watchlistData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
