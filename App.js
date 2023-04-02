import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const Stack = createStackNavigator();
const queryClient = new QueryClient()


export default function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={Login}/>
              <Stack.Screen
                options={{headerShown: false}}
                name="Home"
                component={Home}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
