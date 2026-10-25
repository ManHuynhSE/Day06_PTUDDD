import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorKey, Phone } from "../types";

// import { ChooseColorScreen } from "./ChooseColorScreen";
import { ProductScreen } from "./ProductScreen";
import { ChooseColorScreen } from "./ChooseColorScreen";

export type SelectPhoneParamList = {
  Product: { color?: ColorKey; phone: Phone };
  ChooseColor: { color?: ColorKey; phone: Phone };
};

const Stack = createNativeStackNavigator<SelectPhoneParamList>();

export function SelectPhoneApp({ phone }: { phone: Phone }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Product" 
          component={ProductScreen} 
          initialParams={{ phone }} 
        />
        <Stack.Screen 
          name="ChooseColor" 
          component={ChooseColorScreen} 
          initialParams={{ phone }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


 