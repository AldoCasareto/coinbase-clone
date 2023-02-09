import { View, Text, TouchableHighlight, Image } from 'react-native';
import React from 'react';

type WatchlistItemProps = {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percentageChange: number;
  drag: any;
  isActive: boolean;
};

const WatchlistItem = ({
  id,
  name,
  symbol,
  price,
  percentageChange,
  drag,
  isActive,
}: WatchlistItemProps) => {
  const activeStyle = 'bg-white opacity shadow shadow-black shadow-lg ';

  return (
    <TouchableHighlight
      underlayColor={isActive ? 'white' : '#FAFBFE'}
      className='mt-4 w-full'
      onLongPress={drag}
      onPress={() => console.log('drag')}
    >
      <View
        className={`${
          isActive && activeStyle
        } w-full flex-row items-center justify-between space-y-3`}
      >
        <View className='flex-row items-center space-x-2'>
          <Image
            className='h-8 w-8'
            source={{
              uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id.toString()}.png`,
            }}
          />
          <View className='flex-col'>
            <Text className='text-lg'>{name}</Text>
            <Text className='text-lg'>{symbol}</Text>
          </View>
        </View>
        <View className='flex-col'>
          <Text className='text-right text-lg'>
            USD$
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumSignificantDigits: 2,
            })}
          </Text>
          <Text
            className={`${
              percentageChange > 0 ? 'text-green-400' : 'text-red-600'
            } text-right text-lg`}
          >
            {percentageChange > 0 && '+'}
            {percentageChange.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default WatchlistItem;
