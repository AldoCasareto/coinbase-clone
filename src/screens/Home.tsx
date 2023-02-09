import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import CBButton from '../components/CBButton';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../App';
import Watchlist from '../components/Watchlist';
import { fetchCoinData, WatchlistState } from '../store/features/watchlist/watchlistSlice';
import { RootState } from '../store/store';
import { fetchTopMoversData } from '../store/features/topmovers/topmoversSlice';
import TopMoversListItem from '../components/TopMoversListItem';

const Home = () => {
  const watchlist = useSelector((state: RootState) => state.watchlist);
  const topMovers = useSelector((state: RootState) => state.topMovers);
  const dispatch = useDispatch<AppDispatch>();

  const loadData = async () => {
    try {
      await dispatch(fetchCoinData());
      await dispatch(fetchTopMoversData());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(`topMovers = `, topMovers);

  return (
    <SafeAreaView className='flex-1 items-center bg-white'>
      <ScrollView className='mb-3 w-full' contentContainerStyle={{ alignItems: 'center' }}>
        <Image
          className='mt-10 h-[250px] w-[150px]'
          source={{ uri: 'https://i.imgur.com/9EEaSaS.png' }}
        />
        <Text className='text-xl font-semibold'>Welcome to CoinBase</Text>
        <Text className='mb-6 text-lg font-semibold text-gray-500'>Make your investment today</Text>
        <CBButton title='Get Started' />
        <Watchlist coinData={watchlist.watchListData} />
        <TopMoversListItem id={1} symbol={'BTC'} price={54300} percentChange={-0.01} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
