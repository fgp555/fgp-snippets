<Link href="/screen" push>Go to screen</Link>
<Link href="./folder" push asChild><Button title="Go to folder" /></Link>
<Link href="/pressable" push asChild><Pressable><Text>Go to pressable</Text></Pressable></Link>
<Button title="Button" onPress={() => route.push("/screen")} />

{/* npx expo-router-sitemap */}

