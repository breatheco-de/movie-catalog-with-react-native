import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: { id: number; title: string };
};

export type RootTabParamList = {
  HomeTab: undefined;      // Tab that contains the Home Stack
  Categories: undefined;
  Favorites: undefined;
};

// Helpers for screen props (optional, but convenient)
export type HomeStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
