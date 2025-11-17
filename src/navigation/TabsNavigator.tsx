import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './StackNavigator';
import CategoriesScreen from '../screens/CategoriesScreen';
import { Text } from 'react-native';

type TabsParamList = {
  Feed: undefined;        // Will contain the Stack (Home + Detail)
  Categories: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={StackNavigator}
        options={{ headerShown: false, title: 'Home', tabBarIcon: () => <Text>🎬</Text> }}
      />
     <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: () => <Text>📂</Text>,
        }}
      />
    </Tab.Navigator>
  );
}