import { View, Text } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../App';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import Coin from '../../models/Coin';
import WatchlistItem from './WatchlistItem';
import * as Haptics from 'expo-haptics';
import * as watchlistActions from '../store/actions/watchlist';

type CoinDataProps = {
  coinData: Coin[];
};

const Watchlist = ({ coinData }: CoinDataProps) => {
  const dispatch = useDispatch<any>();
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
    <View>
      <Text>Watchlist</Text>
      <View>
        {/* <DraggableFlatList
          data={coinData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onDragEnd={({ data }) => dispatch(watchlistActions.updatedCoinData(data))}
          renderItem={renderItem}
        /> */}
      </View>
    </View>
  );
};

export default Watchlist;
