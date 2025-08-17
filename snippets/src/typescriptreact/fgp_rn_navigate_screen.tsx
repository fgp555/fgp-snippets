import { Link, useRouter } from "expo-router";
import { Button, Pressable, Text, View } from "react-native";

export default function Navigations() {
  const route = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Navigation</Text>

      <Link href="/products" push>Go to products tabs</Link>

      <Link href="/second" push>Go to Second</Link>

      <Button title="Go to Second" onPress={() => route.push("/second")} />

      <Link href="/demo" push asChild><Button title="Go to demo" /></Link>

      <Link href="./redirect" push asChild><Button title="Go to redirect" /></Link>

      <Link href="/second" push asChild><Pressable><Text>Go to Second</Text></Pressable></Link>

      <Link 
        href={{
          pathname: "/params",
          params: { name: "Kadi" },
        }}
        push asChild>
        <Button title="Go to params Kadi" />
      </Link>

      <Button
        title="Go to params Mary"
        onPress={() => route.push({
          pathname: "/params",
          params: { name: "Mary" },
        })}
      />

      <Link href="./proverbs/1" push asChild><Button title="Go to proverbs/1" /></Link>

      <Link 
        href={{
          pathname: "/proverbs/[id]",
          params: { id: "321" },
        }}
        push asChild>
        <Button title="Go to /proverbs/[id]" />
      </Link>

      <Link href="./products/electronics/123" push asChild><Button title="Go to products/electronics/123" /></Link>
      <Link href="./products/clothing/456" push asChild><Button title="Go to products/clothing/456" /></Link>
    </View>
  );
}

/* 

npx expo-router-sitemap

*/