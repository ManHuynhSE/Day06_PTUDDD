import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BottomTabApp } from './src/ex3/BottomTabApp'; // 1. Import bài tập thanh điều hướng ở dưới

export default function App() {
  return (
    <View style={styles.container}>
      {/* 2. Thay thế ứng dụng cũ bằng ứng dụng BottomTabApp */}
      <BottomTabApp /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 
    backgroundColor: '#fff',
  },
});
