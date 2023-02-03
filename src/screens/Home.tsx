import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CBButton from '../components/CBButton';
import { getCoinData } from '../utils/fetchCoins';
import { useSelector, useDispatch } from 'react-redux';
import { WatchlistState } from '../store/reducers/watchlist';
import * as watchlistActions from '../store/actions/watchlist';
import { AppDispatch } from '../../App';
import WatchlistItem from '../components/WatchlistItem';

const Home = () => {
  const [coinsInformation, setCoinsInformation] = useState<any>([]);
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
        <WatchlistItem
          id={1}
          name='Bitcoin'
          symbol='BTC'
          price={12000}
          percentageChange={-0.5}
          drag={() => console.log('drag')}
          isActive={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
