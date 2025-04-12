import {View, Button} from "react-native"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "./screens/LoginScreen";
import ListingScreen from "./screens/ListingScreen";
import MyListingsScreen from "./screens/MyListingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const HomeTabs = () =>  {
    return(
      <Stack.Navigator >
        <Stack.Screen name="My Listings" component={MyListingsScreen} />    
        <Stack.Screen name="Create Listings" component={ListingScreen} />                     
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Screen" component={LoginScreen} options={{headerShown:false}}/>          
        <Stack.Screen name="Home" component={HomeTabs} options={{headerShown:false}}/>                 
      </Stack.Navigator>
    </NavigationContainer>
  )
}
