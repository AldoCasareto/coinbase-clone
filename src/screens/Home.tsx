import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import CBButton from '../components/CBButton';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../App';
import Watchlist from '../components/Watchlist';
import { fetchCoinData, WatchlistState } from '../store/features/watchlist/watchlistSlice';
import { RootState } from '../store/store';
import { fetchTopMoversData } from '../store/features/topmovers/topmoversSlice';
import TopMoversList from '../components/TopMoversList';
import { fetchNews } from '../store/features/news/newsSlice';
import Newslist from '../components/Newslist';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const watchlist = useSelector((state: RootState) => state.watchlist);
  const topMovers = useSelector((state: RootState) => state.topMovers);
  const news = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch<AppDispatch>();

  const loadData = async () => {
    try {
      await dispatch(fetchCoinData());
      await dispatch(fetchTopMoversData());
      await dispatch(fetchNews());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const viewMoreHandler = () => {
    navigation.navigate('News');
  };

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
        <TopMoversList topMoversData={topMovers.topMoversData} />
        <Newslist newsData={news.newsData} isHomeScreen={true} viewMoreHandler={viewMoreHandler} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};
