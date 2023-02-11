import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { News } from '../../typings';
import NewsItem from './NewsItem';

type NewsListProps = {
  newsData: News[];
  isHomeScreen: boolean;
  viewMoreHandler?: any;
};

const Newslist = ({ newsData, isHomeScreen, viewMoreHandler }: NewsListProps) => {
  return (
    <View className='my-3 flex w-10/12'>
      {isHomeScreen && (
        <View className='flex-row justify-between '>
          <Text className='text-xl font-bold'>News</Text>
          <TouchableOpacity onPress={viewMoreHandler}>
            <Text className='text-xl font-bold'>View more</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={isHomeScreen ? newsData.slice(0, 5) : newsData}
        keyExtractor={(item) => item.url}
        showsVerticalScrollIndicator={false}
        className=''
        renderItem={({ item }) => {
          return (
            <NewsItem
              newsOutlet={item.newsOutlet}
              date={item.date}
              title={item.title}
              image={item.imageUrl}
              url={item.url}
            />
          );
        }}
      />
    </View>
  );
};

export default Newslist;
