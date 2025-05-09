import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";

const TabLayout = () => {
  const scaleValues = {
    home: useRef(new Animated.Value(1)).current,
    chat: useRef(new Animated.Value(1)).current,
    appointment: useRef(new Animated.Value(1)).current,
    reminder: useRef(new Animated.Value(1)).current,
  };

  const animateIcon = (tabName: keyof typeof scaleValues, focused: boolean) => {
    Animated.spring(scaleValues[tabName], {
      toValue: focused ? 1.2 : 1,
      tension: 70,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  type TabIconProps = {
    name: keyof typeof Ionicons.glyphMap;
    focused: boolean;
    label: keyof typeof scaleValues;
  };

  const TabIcon: React.FC<TabIconProps> = ({ name, focused, label }) => (
    <View style={styles.tabButton}>
      <Animated.View
        style={{
          transform: [{ scale: scaleValues[label] }],
          alignItems: "center",
          marginTop: 5, // ⬅️ Moves icon slightly down
        }}
      >
        <Ionicons 
          name={name} 
          size={20} // Icon size remains smaller
          color={focused ? "#284b63" : "#B0BEC5"} 
        />
        <Text style={[
          styles.label, 
          { color: focused ? "#284b63" : "#B0BEC5" }
        ]}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Text>
      </Animated.View>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home" 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              name={focused ? "home" : "home-outline"} 
              focused={focused}
              label="home"
            />
          ),
        }}
        listeners={{ focus: () => animateIcon("home", true) }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              name={focused ? "chatbubbles" : "chatbubbles-outline"} 
              focused={focused}
              label="chat"
            />
          ),
        }}
        listeners={{ focus: () => animateIcon("chat", true) }}
      />

      <Tabs.Screen
        name="appointment"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              name={focused ? "calendar" : "calendar-outline"} 
              focused={focused}
              label="appointment"
            />
          ),
        }}
        listeners={{ focus: () => animateIcon("appointment", true) }}
      />

      <Tabs.Screen
        name="reminder"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon 
              name={focused ? "alarm" : "alarm-outline"} 
              focused={focused}
              label="reminder"
            />
          ),
        }}
        listeners={{ focus: () => animateIcon("reminder", true) }}
      />


      <Tabs.Screen
        name="index" 
        options={{ tabBarButton: () => null }} 
      />
    </Tabs>
  );
};

// Styles
const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "#ffffff",
      height: 55,
      borderTopWidth: 0,
      elevation: 12,
      shadowColor: "#284b63",
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -4 },
      paddingHorizontal: 15,
    },
    tabButton: {
      alignItems: "center", 
      justifyContent: "center",
      flexDirection: "column",
      flex: 1, 
    },
    iconContainer: {
      alignItems: "center", 
      justifyContent: "center",
    },
    label: {
      fontSize: 11,
      fontWeight: "600",
      marginTop: 2, 
      textAlign: "center", 
      letterSpacing: 0.2,
    },
  });


export default TabLayout;
