import { View, Text } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../App';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import Coin from '../../models/Coin';
import WatchlistItem from './WatchlistItem';
import * as Haptics from 'expo-haptics';
import { updateCoinData } from '../store/features/watchlist/watchlistSlice';

type CoinDataProps = {
  coinData: Coin[];
};

const Watchlist = ({ coinData }: CoinDataProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<Coin>) => {
    return (
      <WatchlistItem
        id={item.id}
        name={item.name}
        symbol={item.symbol}
        price={item.price}
        percentageChange={item.percentChange}
        drag={drag}
        isActive={isActive}
      />
    );
  }, []);

  return (
    <View className='mb-3 w-10/12'>
      <Text className='my-2 text-center text-xl font-bold'>Watchlist</Text>
      <View className='w-full border-spacing-1 rounded-xl border border-gray-200 px-2'>
        <DraggableFlatList
          data={coinData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onDragEnd={({ data }) => dispatch(updateCoinData(data))}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default Watchlist;
