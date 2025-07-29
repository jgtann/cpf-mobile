// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import InputScreen from './screens/InputScreen';
import ResultsScreen from './screens/ResultScreen';

const Stack = Platform.OS === 'web'
  ? createStackNavigator()
  : createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['/cpf-mobile'],
        config: {
          screens: {
            Input: '',
            Results: 'results',
          },
        },
      }}
    >
      <Stack.Navigator initialRouteName="Input">
        <Stack.Screen name="Input" component={InputScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
