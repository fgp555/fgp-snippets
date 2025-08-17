import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useNavigation, usePathname, useRouter } from "expo-router";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Animated, Dimensions, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  index: number;
}

const { width: screenWidth } = Dimensions.get('window');

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
  
  // Calcular ancho de cada tab
  const tabWidth = (screenWidth - 32) / visibleTabs.length; // 32 = padding horizontal total

  // Encontrar índice del tab activo
  const activeIndex = visibleTabs.findIndex(tab => tab.route === pathname);

  // Animación para el tab bar (entrada desde abajo)
  const tabBarAnimation = useRef(new Animated.Value(100)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users",
    });
  }, [navigation]);

  // Animar entrada del tab bar
  useEffect(() => {
    if (showTabs) {
      Animated.spring(tabBarAnimation, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.timing(tabBarAnimation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showTabs]);

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

      {/* Tab Bar con animación */}
      <Animated.View 
        style={[
          styles.tabBarContainer,
          {
            transform: [{ translateY: tabBarAnimation }]
          }
        ]}
      >
        {Platform.OS === "ios" ? (
          <BlurView intensity={95} style={styles.blurBackground}>
            <View style={styles.tabBarContent}>
              {visibleTabs.map((item, index) => (
                <ModernTabButton
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={isTabActive(item)}
                  onPress={() => handleTabPress(item)}
                />
              ))}
            </View>
            {/* Indicador animado para iOS */}
            <AnimatedTabIndicator 
              activeIndex={activeIndex} 
              tabWidth={tabWidth}
              visibleTabs={visibleTabs}
            />
          </BlurView>
        ) : (
          <View style={[styles.tabBarContent, styles.androidBackground]}>
            {visibleTabs.map((item, index) => (
              <ModernTabButton
                key={item.id}
                item={item}
                index={index}
                isActive={isTabActive(item)}
                onPress={() => handleTabPress(item)}
              />
            ))}
            {/* Indicador animado para Android */}
            <AnimatedTabIndicator 
              activeIndex={activeIndex} 
              tabWidth={tabWidth}
              visibleTabs={visibleTabs}
            />
          </View>
        )}
      </Animated.View>
    </>
  );
}

const ModernTabButton: React.FC<CustomTabButtonProps> = ({ item, isActive, onPress, index }) => {
  // Animaciones para el botón
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.7)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      // Animación de activación
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          useNativeDriver: true,
          tension: 150,
          friction: 4,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -8,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.spring(bounceAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 200,
            friction: 6,
          })
        ])
      ]).start();
    } else {
      // Animación de desactivación
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 150,
          friction: 4,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isActive]);

  const handlePress = () => {
    // Animación de toque
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1.1 : 1,
        useNativeDriver: true,
        tension: 150,
        friction: 4,
      })
    ]).start();

    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={handlePress}
      activeOpacity={1} // Usamos animación personalizada
    >
      <Animated.View
        style={[
          styles.tabButtonContent,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim }
            ],
            opacity: fadeAnim,
          }
        ]}
      >
        {isActive ? (
          <LinearGradient 
            colors={[item.color, `${item.color}88`]} 
            style={styles.activeTabGradient}
          >
            <View style={styles.tabContent}>
              <Animated.View style={[styles.iconContainer, styles.activeIconContainer]}>
                <FontAwesome6 name={item.icon as any} size={20} color="#ffffff" />
              </Animated.View>
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
          <Animated.View style={[styles.externalIndicator, { opacity: fadeAnim }]}>
            <FontAwesome6 name="up-right-from-square" size={8} color="#94a3b8" />
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

// Componente del indicador animado
const AnimatedTabIndicator = ({ 
  activeIndex, 
  tabWidth, 
  visibleTabs 
}: { 
  activeIndex: number; 
  tabWidth: number;
  visibleTabs: TabItem[];
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleX = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (activeIndex >= 0) {
      // Mostrar indicador
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Animación de movimiento
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: activeIndex * tabWidth + 16, // 16 = margin inicial
          useNativeDriver: true,
          tension: 120,
          friction: 8,
        }),
        // Efecto de "squeeze" en la transición
        Animated.sequence([
          Animated.timing(scaleX, {
            toValue: 0.8,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(scaleX, {
            toValue: 1,
            useNativeDriver: true,
            tension: 200,
            friction: 6,
          })
        ])
      ]).start();
    } else {
      // Ocultar indicador
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [activeIndex, tabWidth]);

  if (activeIndex < 0) return null;

  const activeTab = visibleTabs[activeIndex];
  
  return (
    <Animated.View
      style={[
        styles.animatedIndicator,
        {
          transform: [
            { translateX },
            { scaleX }
          ],
          opacity,
          width: tabWidth - 32,
          backgroundColor: activeTab?.color || '#3b82f6',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === "ios" ? 34 : 10,
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
    position: "relative",
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
    minHeight: 56,
  },
  tabButtonContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    position: "relative",
    width: "100%",
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
    shadowOpacity: 0.3,
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
  activeIconContainer: {
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  activeTabText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  inactiveTabText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
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
  animatedIndicator: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 8 : 8,
    height: 3,
    borderRadius: 2,
    marginHorizontal: 16,
  },
});