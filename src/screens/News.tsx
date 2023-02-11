import { View, Text, FlatList } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NewsItem from '../components/NewsItem';

const News = ({ navigation }) => {
  const news = useSelector((state: RootState) => state.news.newsData);

  useLayoutEffect(() => {
    const parentNavigator = navigation.getParent();
    parentNavigator.setOptions({
      header: () => {},
    });

    return () => {
      parentNavigator.setOptions({
        header: null,
      });
    };
  }, [navigation]);

  return (
    <View className='bg-white p-3'>
      <FlatList
        data={news}
        keyExtractor={(item: any) => item.url}
        showsVerticalScrollIndicator={false}
        className=''
        renderItem={({ item }: any) => {
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

export default News;
