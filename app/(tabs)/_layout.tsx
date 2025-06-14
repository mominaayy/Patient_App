import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
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
    name: keyof typeof MaterialIcons.glyphMap;
    focused: boolean;
    label: keyof typeof scaleValues;
  };

  const TabIcon: React.FC<TabIconProps> = ({ name, focused, label }) => (
    <View style={styles.tabButton}>
      <Animated.View
        style={[
          styles.iconContainer,
          { 
            transform: [{ scale: scaleValues[label] }],
            backgroundColor: focused ? 'rgba(40, 75, 99, 0.1)' : 'transparent',
          }
        ]}
      >
        <MaterialIcons
          name={name} 
          size={24}
          color={focused ? "#284b63" : "#aaa"} 
        />
      </Animated.View>
      <Text style={[
        styles.label, 
        { 
          color: focused ? "#284b63" : "#aaa",
          fontWeight: focused ? '600' : '400'
        }
      ]}>
        {label === 'home' ? 'Home' : 
         label === 'chat' ? 'Chat' : 
         label === 'appointment' ? 'Appointments' : 
         label === 'reminder' ? 'Reminder' : label}
      </Text>
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
              name="home" 
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
              name="chat" 
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
              name="event" 
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
              name="notifications" 
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

// Updated styles to match doctor app
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    height: 60, // Optimal height without extra spacing
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: "#284b63",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    paddingHorizontal: 0, // Removed horizontal padding
  },
  tabButton: {
    alignItems: "center", 
    justifyContent: "center",
    flex: 1, 
    paddingVertical: 6,
  },
  iconContainer: {
    alignItems: "center", 
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    textAlign: "center", 
  },
});

export default TabLayout;