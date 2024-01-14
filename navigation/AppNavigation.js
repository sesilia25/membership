import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeIcon, InformationCircleIcon } from "react-native-heroicons/solid";
import HomeScreen from "../screens/owner/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import InformationScreen from "../screens/InformationScreen";
// Member
import HomeMemberScreen from "../screens/member/HomeMemberScreen";
import RenewalScreen from "../screens/member/RenewalScreen";
import useAuth from "../hooks/useAuth";
// Owner
import SettingsScreen from "../screens/owner/SettingsScreen";
import HistoryScreen from "../screens/owner/HistoryScreen";
import ValidationScreen from "../screens/owner/ValidationScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Admin Tabs
const AdminTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Validation"
        component={ValidationScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Validasi",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="checkmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Riwayat",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="time" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Pengaturan",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          user ? (user.role === "member" ? "HomeMember" : "Home") : "Welcome"
        }
      >
        {user ? (
          user.role === "member" ? (
            <>
              <Stack.Screen
                name="HomeMember"
                options={{ headerShown: false }}
                component={HomeMemberScreen}
              />
              <Stack.Screen
                name="Renewal"
                options={{ headerShown: false }}
                component={RenewalScreen}
              />
            </>
          ) : (
            <Stack.Screen
              name="AdminTabs"
              options={{ headerShown: false }}
              component={AdminTabs}
            />
          )
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              options={{ headerShown: false }}
              component={WelcomeScreen}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              options={{ headerShown: false }}
              component={SignUpScreen}
            />
            <Stack.Screen
              name="Information"
              options={{ headerShown: false }}
              component={InformationScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
