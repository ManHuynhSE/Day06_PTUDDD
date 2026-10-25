import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";

// import { ChooseColorScreen } from "./ChooseColorScreen";
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";
import { fetchPhone } from "../api/phoneApi";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { SelectPhoneApp } from "./SelectPhoneApp";

export type SelectPhoneParamList = {
  Product: { color?: ColorKey; phone: Phone };
  ChooseColor: { color?: ColorKey; phone: Phone };
};

const Stack = createNativeStackNavigator<SelectPhoneParamList>();



export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
 
  const load = useCallback(async () => {
    // TODO 1: setError(null); setPhone(null);
    // TODO 2: try { setPhone(await fetchPhone("1")) } catch (e) { setError(...) }
    setError(null);
    setPhone(null);
    try {
        setPhone(await fetchPhone("1"))
    }
    catch(err:any) {
        setError(err.message)
    }
  }, []);

  useEffect(()=>{
    load();
  },[])

  if (error || !phone) {
    return (
      <View style={styles.center}>
        <Text style={[styles.msgText, { color: 'red' }]}>{error}</Text>
        <Button title="Thử lại" onPress={load} color="#1877F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SelectPhoneApp phone={phone} />
      <StatusBar/>
    </View>
  );
 
  // TODO 3: useEffect gọi load() khi màn hình mở lần đầu
 
  // TODO 4: nếu có error → <ErrorBox message={error} onRetry={load} />
  // TODO 5: nếu chưa có phone → <Loading />  (vòng xoay ActivityIndicator + chữ "Đang tải...")
  // TODO 6: ngược lại → <SelectPhoneApp phone={phone} />   (dùng lại toàn bộ Bài 1)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  msgText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  }
});



 