import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function Header({ title, name, onPress }) {
  return (
    <View style={styles.header}>
      <MaterialIcons
        onPress={onPress}
        name={name}
        size={30}
        style={styles.iconLeft}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <FontAwesome
        onPress={()=>{}}
        name='search'
        size={22}
        style={styles.iconRight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "11%",
    backgroundColor: "#00A6FB",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    top: Platform.OS === "ios" ? 20 : 13,
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 1,
  },
  iconLeft: {
    position: "absolute",
    top: Platform.OS === "ios" ? 53 : 35,
    left: 10,
    color: "#fff",
  },
  iconRight: {
    position: "absolute",
    top: Platform.OS === "ios" ? 57 : 40,
    right: 15,
    color: "#fff",
  },
});
