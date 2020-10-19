import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import {MainScreen} from "./app/components/screens/main_screen";
import {CartScreen} from "./app/components/screens/cart_screen";
import {CheckoutScreen} from "./app/components/screens/checkout_screen";
import ContextProvider from "./app/state_management/context_provider";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
    return (
      <ContextProvider>
          <SafeAreaProvider>
              <NavigationContainer
                  theme={{
                      ...DefaultTheme,
                      colors: {
                          ...DefaultTheme.colors,
                          background:"rgb(255,255,255)"
                      }
                  }}
              >
                  <Stack.Navigator
                      initialRouteName="Main"
                      screenOptions={{
                          headerShown: false
                      }}

                  >
                      <Stack.Screen name="Main" component={MainScreen}/>
                      <Stack.Screen name="Cart" component={CartScreen}/>
                      <Stack.Screen name="Checkout" component={CheckoutScreen}/>
                  </Stack.Navigator>
              </NavigationContainer>
          </SafeAreaProvider>
      </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
