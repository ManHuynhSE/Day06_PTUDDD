import React from "react";
import { SafeAreaView, View, Image, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp"; // Điều chỉnh đường dẫn cho đúng cấu trúc thư mục của bạn
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Stars";
import { formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product">;

export function ProductScreen({ navigation, route }: Props) {
  // Lấy dữ liệu phone từ route.params (do truyền qua initialParams)
  const { phone, color: picked } = route.params; 
  
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image 
          source={PHONE_COLORS[shown].image} 
          style={styles.image}
          resizeMode="contain" 
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {/* Comment đặt ở đây để không làm lỗi View */}
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
        </View>
        <Pressable onPress={()=>navigation.navigate("ChooseColor", { color: picked })}>
            <TextInput editable={false} style = {{textAlign:"center",borderRadius:6,height:30,borderWidth:1.5,borderColor:"gray"}} placeholder={picked != phone.defaultColor?"4 MÀU - CHỌN MÀU":"4 MÀU - CHỌN LOẠI"}></TextInput>
            <Text style= {{position:"absolute",right:12,marginTop:5}}>→</Text>
        </Pressable>
        <Pressable style = {{marginTop:40}}>
            <TextInput editable={false} style = {{textAlign:"center",borderRadius:15,height:30,backgroundColor:"red",color:"white"}} placeholder="CHỌN MUA"></TextInput>
            
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1, 
    backgroundColor: "#fff", 
    paddingHorizontal: 16
  },
  imageWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  info: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  name: {
    fontSize: 18,
    fontWeight: "bold"
  },
  price: {
    fontSize: 16,
    color: "red"
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "gray",
    marginLeft: 8
  },
  review: {
    marginLeft: 4
  },
  badge: {
  }
});
