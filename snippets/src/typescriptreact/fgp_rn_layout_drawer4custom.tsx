import { FontAwesome6 } from "@expo/vector-icons";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import Constants from "expo-constants";
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname, useRouter } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={ModernCustomDrawer}
      screenOptions={({ navigation  }) => ({
        drawerPosition: "left",
        headerLeft: () => (
          <TouchableOpacity 
            onPress={() => navigation.toggleDrawer()} 
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <FontAwesome6 name="bars" size={22} color="#1a1a1a" />
          </TouchableOpacity>
        ),
        headerTintColor: "#1a1a1a",
        headerTitleAlign: "center",
        headerStyle: { 
          backgroundColor: "#ffffff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      })}
    />
  );
}

const ModernCustomDrawer = (props: DrawerContentComponentProps) => {
  const router = useRouter() as any;
  const pathname = usePathname();

  const isAdmin = true;
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.fgp.app";
  const backendDomain = "api.fgp.com";
  const androidVersion = Constants.expoConfig?.version;
  const imgLogo = "https://i.postimg.cc/FRn26Vhg/fgp-team-logo.png";

  const handleLogout = () => {
    console.log("handleLogout");
    router.push("/");
  };

  const MenuItem = ({ 
    icon, 
    title, 
    onPress, 
    isActive = false, 
    showChevron = true, 
    iconColor = "#64748b",
    isExternal = false 
  }: {
    icon: string;
    title: string;
    onPress: () => void;
    isActive?: boolean;
    showChevron?: boolean;
    iconColor?: string;
    isExternal?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.menuItem, isActive && styles.activeMenuItem]}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
          <FontAwesome6 
            name={icon as any} 
            size={18} 
            color={isActive ? "#ffffff" : iconColor} 
          />
        </View>
        <Text style={[
          styles.menuItemText, 
          isActive && styles.activeMenuItemText
        ]}>
          {title}
        </Text>
      </View>
      {showChevron && (
        <FontAwesome6
          name={isExternal ? "up-right-from-square" : "chevron-right"}
          size={14}
          color={isActive ? "#ffffff" : "#94a3b8"}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header with gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Image source={{ uri: imgLogo }} style={styles.logo} />
        </View>
      </LinearGradient>

      {/* Main Menu Section */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Navegación</Text>
        
        {isAdmin && (
          <MenuItem
            icon="users"
            title="Usuarios"
            onPress={() => router.push("/user/list")}
            isActive={pathname === "/user/list"}
            iconColor="#3b82f6"
          />
        )}
        
        <MenuItem
          icon="user"
          title="Mi Perfil"
          onPress={() => router.push("/profile")}
          isActive={pathname === "/profile"}
          iconColor="#10b981"
        />

        <MenuItem
          icon="circle-info"
          title="Acerca de"
          onPress={() => router.push("/about")}
          isActive={pathname === "/about"}
          iconColor="#8b5cf6"
        />
      </View>

      {/* External Links Section */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Enlaces</Text>
        
        <MenuItem
          icon="google-play"
          title="Actualizar"
          onPress={() => Linking.openURL(playStoreUrl)}
          showChevron={true}
          iconColor="#34d399"
          isExternal={true}
        />
        
        <MenuItem
          icon="globe"
          title={backendDomain}
          onPress={() => Linking.openURL(`https://${backendDomain}`)}
          showChevron={true}
          iconColor="#06b6d4"
          isExternal={true}
        />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        {/* Version Info */}
        <View style={styles.versionContainer}>
          <FontAwesome6 name="download" size={14} color="#94a3b8" />
          <Text style={styles.versionText}>Versión {androidVersion}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <FontAwesome6 name="right-from-bracket" size={16} color="#ffffff" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 240,
    height: 60,
    resizeMode: "contain",
  },
  menuSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 4,
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  activeMenuItem: {
    backgroundColor: "#667eea",
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  activeIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e293b",
    flex: 1,
  },
  activeMenuItemText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  footer: {
    marginTop: "auto",
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 20,
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: "#94a3b8",
    marginLeft: 6,
    fontWeight: "500",
  },
  logoutButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#ef4444",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginLeft: 8,
  },
});