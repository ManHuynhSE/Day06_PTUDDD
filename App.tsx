import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SelectPhoneApp } from './src/ex1/SelectPhoneApp';
import { PHONES } from './src/data/phones';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';

export default function App() {
  return (
    // Thêm style={styles.container} vào đây
    <View style={styles.container}>
      <SelectPhoneApi></SelectPhoneApi>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                 // Quan trọng: Giúp View chiếm trọn bộ diện tích màn hình
    backgroundColor: '#fff',
  },
});
