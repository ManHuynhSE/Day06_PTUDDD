import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp"; // Kiểm tra lại đường dẫn import này
import { PHONE_COLORS, COLOR_ORDER } from "../data/phones"; // Kiểm tra lại đường dẫn dữ liệu của bạn

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor">;

export function ChooseColorScreen({ navigation, route }: Props) {
  const { phone } = route.params;
  
  // Quản lý trạng thái màu sắc được người dùng nhấn chọn
  const [picked, setPicked] = useState<typeof phone.defaultColor>(route.params?.color ?? phone.defaultColor);
  
  // Tách tên điện thoại thành 2 dòng dựa trên ký tự " - "
  const [line1, line2] = phone.name.split(" - ");

  // Hàm xử lý khi người dùng chọn xong màu và nhấn nút xác nhận
  const handleDone = () => {
    // Truyền ngược param 'color' đã chọn về màn hình Product
    navigation.navigate("Product", { color: picked });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Khối Thông tin sản phẩm phía trên (Header) */}
      <View style={styles.header}>
        <Image 
          source={PHONE_COLORS[picked].image}
          style={styles.thumb} 
          resizeMode="contain" 
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>{line1}</Text>
          {line2 ? <Text style={styles.subtitle}>{line2}</Text> : null}
          
          {/* TODO 3: Hiển thị thông tin màu sắc đang được chọn */}
          <View style={styles.colorRow}>
            <Text style={styles.colorLabel}>Màu:</Text>
            <Text style={styles.colorValue}>{PHONE_COLORS[picked].label}</Text>
            
          </View>
          <Text style={{}}>Cung cấp bởi:{phone.supplier}</Text>
          <Text style={{}}>Giá:{phone.price}</Text>
        </View>
      </View>

      
      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        
      
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable 
              key={key} 
              onPress={() => setPicked(key)}
              style={[
                styles.swatch, 
                { backgroundColor: PHONE_COLORS[key].hex }, 
                picked === key && styles.swatchOn
              ]} 
            />
          ))}
        </View>

        {/* TODO 4: Nút xác nhận lưu màu sắc đã chọn */}
        <Pressable style={styles.doneBtn} onPress={handleDone}>
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  thumb: {
    width: 100,
    height: 120,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  colorLabel: {
    fontSize: 15,
    color: "#000",
  },
  colorValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
  body: {
    flex: 1,
    backgroundColor: "#c4c4c4", // Màu nền xám nhạt bao trọn khu vực chọn màu theo design gốc
    padding: 16,
    justifyContent: "space-between", // Đẩy dòng nhắc chọn màu lên đầu và nút Xong xuống đáy
  },
  hint: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  swatches: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16, // Khoảng cách đều giữa các ô màu xếp dọc
    flex: 1,
  },
  swatch: {
    width: 80,
    height: 80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  swatchOn: {
    borderWidth: 3,
    borderColor: "#1877F2", // Viền màu nổi bật bao quanh ô đang được chọn tích cực
  },
  doneBtn: {
    backgroundColor: "#192a56",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  doneBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
