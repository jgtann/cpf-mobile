// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { Platform } from 'react-native';
import InputScreen from './screens/InputScreen';
import ResultsScreen from './screens/ResultScreen';

const Stack = Platform.OS === 'web'
  ? require('@react-navigation/stack').createStackNavigator()
  : require('@react-navigation/native-stack').createNativeStackNavigator();

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
