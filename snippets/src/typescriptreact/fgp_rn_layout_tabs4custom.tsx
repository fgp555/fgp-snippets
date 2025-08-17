// ${TM_FILENAME_BASE}.tsx

import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useNavigation, usePathname, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Animated, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TabItem {
  id: string;
  title: string;
  icon: string;
  route?: string;
  url?: string;
  color: string;
  requiresAdmin?: boolean;
}

interface CustomTabButtonProps {
  item: TabItem;
  isActive: boolean;
  onPress: () => void;
}

export default function ModernTabsLayout() {
  const navigation = useNavigation();
  const router = useRouter() as any;
  const pathname = usePathname();

  const isAdmin = true;
  const showTabs = !pathname.startsWith("/user/");

  // Configuración de tabs más estructurada
  const tabItems: TabItem[] = [
    {
      id: "search",
      title: "Buscar",
      icon: "magnifying-glass",
      route: "/tabs/search",
      color: "#3b82f6",
    },
    {
      id: "web",
      title: "Web",
      icon: "globe",
      url: "http://example.com",
      color: "#10b981",
      requiresAdmin: true,
    },
    {
      id: "profile",
      title: "Profile",
      icon: "user",
      route: "/tabs/profile",
      color: "#8b5cf6",
      requiresAdmin: true,
    },
  ];

  // Filtrar tabs basado en permisos de admin
  const visibleTabs = tabItems.filter((tab) => !tab.requiresAdmin || isAdmin);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users",
    });
  }, [navigation]);

  const handleTabPress = (item: TabItem) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else if (item.route) {
      router.push(item.route);
    }
  };

  const isTabActive = (item: TabItem): boolean => {
    if (item.route) {
      return pathname === item.route;
    }
    return false;
  };

  if (!showTabs) {
    return <Tabs screenOptions={{ tabBarStyle: { display: "none" }, headerShown: false }} />;
  }

  return (
    <>
      <Tabs screenOptions={{ tabBarStyle: { display: "none" }, headerShown: false }} />

      {/* Tab Bar con Blur Effect para iOS */}
      <View style={styles.tabBarContainer}>
        {Platform.OS === "ios" ? (
          <BlurView intensity={95} style={styles.blurBackground}>
            <View style={styles.tabBarContent}>
              {visibleTabs.map((item) => (
                <ModernTabButton
                  key={item.id}
                  item={item}
                  isActive={isTabActive(item)}
                  onPress={() => handleTabPress(item)}
                />
              ))}
            </View>
          </BlurView>
        ) : (
          <View style={[styles.tabBarContent, styles.androidBackground]}>
            {visibleTabs.map((item) => (
              <ModernTabButton
                key={item.id}
                item={item}
                isActive={isTabActive(item)}
                onPress={() => handleTabPress(item)}
              />
            ))}
          </View>
        )}

        {/* Indicador de tab activo */}
        <View style={styles.activeIndicator} />
      </View>
    </>
  );
}

const ModernTabButton: React.FC<CustomTabButtonProps> = ({ item, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {isActive ? (
        <LinearGradient colors={[item.color, `${item.color}88`]} style={styles.activeTabGradient}>
          <View style={styles.tabContent}>
            <View style={styles.iconContainer}>
              <FontAwesome6 name={item.icon as any} size={20} color="#ffffff" />
            </View>
            <Text style={styles.activeTabText}>{item.title}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.tabContent}>
          <View style={styles.iconContainer}>
            <FontAwesome6 name={item.icon as any} size={20} color="#64748b" />
          </View>
          <Text style={styles.inactiveTabText}>{item.title}</Text>
        </View>
      )}

      {/* Pequeño indicador para tabs externos */}
      {item.url && (
        <View style={styles.externalIndicator}>
          <FontAwesome6 name="up-right-from-square" size={8} color="#94a3b8" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 34 : 10, // Safe area para iPhone
  },
  blurBackground: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  androidBackground: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  tabBarContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    position: "relative",
    minHeight: 56,
  },
  activeTabButton: {
    transform: [{ scale: 1.05 }],
  },
  activeTabGradient: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    width: "100%",
    alignItems: "center",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 4,
  },
  activeTabText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  inactiveTabText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  activeIndicator: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 38 : 14,
    left: "50%",
    width: 32,
    height: 4,
    backgroundColor: "#e2e8f0",
    borderRadius: 2,
    marginLeft: -16,
  },
  externalIndicator: {
    position: "absolute",
    top: 4,
    right: 8,
    width: 12,
    height: 12,
    backgroundColor: "rgba(148, 163, 184, 0.2)",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Componente adicional para animaciones más avanzadas (opcional)
export const AnimatedTabIndicator = ({ activeIndex, tabWidth }: { activeIndex: number; tabWidth: number }) => {
  const translateX = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [activeIndex, tabWidth]);

  return (
    <Animated.View
      style={[
        animatedStyles.animatedIndicator,
        {
          transform: [{ translateX }],
          width: tabWidth - 32,
        },
      ]}
    />
  );
};

const animatedStyles = StyleSheet.create({
  animatedIndicator: {
    position: "absolute",
    bottom: 8,
    height: 3,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
    marginHorizontal: 16,
  },
});
