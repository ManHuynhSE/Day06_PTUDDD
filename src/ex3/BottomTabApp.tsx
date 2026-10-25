import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";


const colors = { red: "#ef4444", gray: "#6b7280", border: "#e5e7eb" };


type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// Tên icon: [khi chọn, khi không chọn]
const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList 
      data={PHONES} 
      keyExtractor={(p) => p.id} 
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text>{item.name.split(" - ")[0]}</Text>
        </View>
      )} 
    />
  );
}

// TODO 1: SearchTab
function SearchTab() {
  const [keyword, setKeyword] = useState("");

  // Lọc không phân biệt hoa thường
  const filteredPhones = PHONES.filter((phone) =>
    phone.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      {filteredPhones.length > 0 ? (
        <FlatList
          data={filteredPhones}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text>{item.name.split(" - ")[0]}</Text>
            </View>
          )}
        />
      ) : (
        <View style={s.emptyContainer}>
          <Text style={s.emptyText}>Không có kết quả cho “{keyword}”</Text>
        </View>
      )}
    </View>
  );
}

// TODO 2: ProfileTab
function ProfileTab() {
  const user = { name: "Nguyễn Văn A", email: "anguyen@example.com" };
  const firstLetter = user.name.trim().charAt(0).toUpperCase();

  return (
    <View style={s.profileContainer}>
      {/* Vòng tròn Avatar */}
      <View style={s.avatar}>
        <Text style={s.avatarText}>{firstLetter}</Text>
      </View>
      {/* Name */}
      <Text style={s.profileName}>{user.name}</Text>
      {/* Email */}
      <Text style={s.profileEmail}>{user.email}</Text>
    </View>
  );
}

// TODO 3: export function BottomTabApp()
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.gray,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = ICONS[route.name][focused ? 0 : 1];
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeTab} 
          options={{ title: "Trang chủ" }} 
        />
        <Tab.Screen 
          name="Search" 
          component={SearchTab} 
          options={{ title: "Tìm kiếm" }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileTab} 
          options={{ title: "Cá nhân" }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.gray,
    fontSize: 16,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.gray,
  },
});
