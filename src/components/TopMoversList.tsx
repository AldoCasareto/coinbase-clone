import { View, FlatList, Text } from 'react-native';
import React from 'react';
import { MoversProps } from '../../typings';
import TopMoversItem from './TopMoversItem';

type TopMoversData = {
  topMoversData: MoversProps[];
};

const TopMoversList = ({ topMoversData }: TopMoversData) => {
  return (
    <View className='flex w-10/12'>
      <Text className='text-center text-xl font-bold'>Top Movers</Text>
      <FlatList
        data={topMoversData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToOffsets={[...Array(topMoversData.length)].map((x, i) => 158 * i + 162)}
        decelerationRate={0}
        snapToAlignment='center'
        contentContainerStyle={{ height: 160, marginTop: 12 }}
        renderItem={({ item }) => {
          return (
            <TopMoversItem
              id={item.id}
              symbol={item.symbol}
              price={item.price}
              percentChange={item.percentChange}
            />
          );
        }}
      />
    </View>
  );
};

export default TopMoversList;
