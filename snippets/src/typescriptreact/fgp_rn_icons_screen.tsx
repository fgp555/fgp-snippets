import { Link } from "expo-router";
import { View, StyleSheet, Image, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome6,
  Fontisto,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";

export default function Icons() {
  const loginWithFacebook = () => {
    console.log("Button pressed");
  };


  return (
    <View style={styles.container}>
      <FontAwesome.Button name="facebook" backgroundColor="#3b5998" onPress={loginWithFacebook}>
        Login with Facebook
      </FontAwesome.Button>

      {/* https://fontawesome.com/search */}
      <FontAwesome name="apple" size={25} />
      <FontAwesome6 name={"house"} size={24} color="#b00" />

      {/* https://ionic.io/ionicons */}
      <Ionicons name="checkmark-circle" size={32} color="green" />

      {/* https://material.io/resources/icons */}
      <MaterialIcons name="fingerprint" color="#b00" size={25} />

      {/* https://icons.expo.fyi/Index */}
      <AntDesign name="chrome" size={24} color="black" />

      {/* https://icongr.am/entypo */}
      <Entypo name="colours" size={24} color="black" />

      {/* https://icons.expo.fyi/ */}
      <EvilIcons name="user" size={24} color="black" />

      {/* https://feathericons.com/ */}
      <Feather name="coffee" size={24} color="black" />

      {/* https://zurb.com/playground/foundation-icon-fonts-3 */}
      <Foundation name="social-amazon" size={24} color="black" />

      {/* https://static.enapter.com/rn/icons/material-community.html */}
      <MaterialCommunityIcons name="airballoon-outline" size={24} color="black" />

      {/* https://primer.style/foundations/icons */}
      <Octicons name="feed-tag" size={24} color="black" />

      {/* https://simplelineicons.github.io/ */}
      <SimpleLineIcons name="directions" size={24} color="black" />

      <Zocial name="github" size={24} color="black" />
      <Fontisto name="adobe" size={24} color="black" />

      <Image source={require("../assets/icon.png")} style={{ width: 50, height: 50 }} />

      <Link href="/customIcon" style={{ marginTop: 50 }}>
        <Text>Custom Icon Example</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


/* 
    Icons 
    https://icons.expo.fyi/Index
    
    Icon SVG Generator
    https://react-svgr.com/playground/?native=true 

    https://icons.expo.fyi/Index
    https://docs.expo.dev/guides/icons
*/