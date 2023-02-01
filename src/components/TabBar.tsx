import React from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View className='flex h-20 flex-row justify-evenly border border-gray-400 border-t-gray-300'>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const isActions = route.name === 'Actions';
        const itemColor = focused ? '#0053f8' : '#5c626e';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
        };

        const icons: { [key: string]: string } = {
          Home: 'home',
          Porfolio: 'pie-chart',
          Prices: 'cellular',
        };

        const iconName = icons[route.name] || 'person';

        const animatedValue = new Animated.Value(1);

        const onPressIn = () => {
          Animated.spring(animatedValue, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
        };

        const onPressOut = () => {
          Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        };

        const animatedStyle = { transform: [{ scale: animatedValue }] };

        return (
          <Animated.View
            className={`${isActions ? 'mt-2' : 'mt-3'} w-14`}
            key={route.name}
            style={animatedStyle}
          >
            <TouchableOpacity onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
              {isActions ? (
                <View className='h-10 w-10 items-center justify-center self-center rounded-full bg-blue-600'>
                  <Ionicons name='swap-horizontal' size={20} color='white' />
                </View>
              ) : (
                <View className='items-center'>
                  <Ionicons name={iconName as any} size={20} className='mb-1' color={itemColor} />
                  <Text className='text-xs font-semibold' style={{ color: itemColor }}>
                    {route.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default TabBar;
