import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  useColorScheme, 
  Switch, 
  TouchableOpacity 
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const ThemeOption = ({ label, value, icon, isSelected, theme, onPress }) => (
  <TouchableOpacity 
    style={[styles.optionItem, { borderBottomColor: theme.border }]}
    onPress={onPress}
  >
    <View style={styles.optionLeft}>
      <Ionicons 
        name={icon} 
        size={24} 
        color={theme.text} 
        style={{ marginRight: 16 }}
      />
      <Text style={[styles.optionText, { color: theme.text }]}>{label}</Text>
    </View>
    <View style={[styles.radio, { borderColor: theme.border }]}>
      {isSelected && (
        <View style={[styles.radioInner, { backgroundColor: theme.heading }]} />
      )}
    </View>
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [themeOverride, setThemeOverride] = React.useState('system');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const theme = {
    bg: isDark ? "#121212" : "#ffffff",
    text: isDark ? "#eeeeee" : "#3c3c3c",
    cardBg: isDark ? "#1e1e1e" : "#f5f5f5",
    border: isDark ? "#333333" : "#e0e0e0",
    heading: isDark ? "#4a90e2" : "#284b63",
    subText: isDark ? "#888888" : "#555555",
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={[styles.header, { backgroundColor: theme.heading }]}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* Appearance Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[
            styles.sectionTitle, 
            { color: theme.heading, borderBottomColor: theme.border }
          ]}>
            Appearance
          </Text>
          
          <ThemeOption 
            label="System Default" 
            value="system" 
            icon="phone-portrait-outline"
            isSelected={themeOverride === 'system'}
            theme={theme}
            onPress={() => setThemeOverride('system')}
          />
          <ThemeOption 
            label="Light Theme" 
            value="light" 
            icon="sunny-outline"
            isSelected={themeOverride === 'light'}
            theme={theme}
            onPress={() => setThemeOverride('light')}
          />
          <ThemeOption 
            label="Dark Theme" 
            value="dark" 
            icon="moon-outline"
            isSelected={themeOverride === 'dark'}
            theme={theme}
            onPress={() => setThemeOverride('dark')}
          />
        </View>

        {/* Account Settings */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[
            styles.sectionTitle, 
            { color: theme.heading, borderBottomColor: theme.border }
          ]}>
            Account
          </Text>
          
          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: theme.border }]}>
            <View style={styles.optionLeft}>
              <MaterialIcons 
                name="person-outline" 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: theme.border }]}>
            <View style={styles.optionLeft}>
              <Ionicons 
                name="lock-closed-outline" 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[
            styles.sectionTitle, 
            { color: theme.heading, borderBottomColor: theme.border }
          ]}>
            Preferences
          </Text>
          
          <View style={[styles.optionItem, { borderBottomColor: theme.border }]}>
            <View style={styles.optionLeft}>
              <Ionicons 
                name="notifications-outline" 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#767577", true: theme.heading }}
            />
          </View>

          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: theme.border }]}>
            <View style={styles.optionLeft}>
              <Ionicons 
                name="language-outline" 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>Language</Text>
            </View>
            <Text style={[styles.subText, { color: theme.subText }]}>English</Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[
            styles.sectionTitle, 
            { color: theme.heading, borderBottomColor: theme.border }
          ]}>
            Support
          </Text>
          
          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: theme.border }]}>
            <View style={styles.optionLeft}>
              <Ionicons 
                name="document-text-outline" 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionItem, { borderBottomColor: theme.border }]}>
            <View style={styles.optionLeft}>
              <Ionicons 
                name="help-circle-outline" 
                size={24} 
                color={theme.text} 
                style={{ marginRight: 16 }}
              />
              <Text style={[styles.optionText, { color: theme.text }]}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>

          <View style={styles.versionContainer}>
            <Text style={[styles.versionText, { color: theme.subText }]}>
              App Version 1.0.0
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
    borderBottomWidth: 1,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  versionContainer: {
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
  },
  subText: {
    fontSize: 14,
  },
});
