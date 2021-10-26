import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider, Button, Input, Heading } from 'native-base'
import pizzaImage from './assets/pizza.png'

function HomeScreen({ route, navigation }) {
  const [userEmail, setEmailAddress] = React.useState('');
  const [storedEmail, setStoredEmail] = React.useState('');

  let onPress = () => {
    let params = { email: userEmail, exists: false }
    if(userEmail == storedEmail) {
      params.exists = true
      navigation.navigate('Welcome', params)
    }
    else {
      setStoredEmail(userEmail)
      navigation.navigate('Welcome', params)
    }
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.greenRow }>
        <Image source={ pizzaImage } style={ styles.image } />
      </View>
      <View style={ styles.whiteRow }>
        <Heading size="xl">Mario's Pizza</Heading>
        <Text size="lg">The best pizza in Belfast</Text>
      </View>
      <View style={ styles.redRow }>
        <Input
          placeholder='Email address'
          value={ userEmail }
          onChangeText={ email => setEmailAddress(email) }
          style={ styles.textBox }
        />
        <Button 
          style={ styles.button } 
          bg="primary.400"
          size="md" 
          onPress={ onPress } block bordered primary>
          Get updates from Mario's Pizza
        </Button>
      </View>
    </View>
  );
}

function WelcomeScreen({ route, navigation }) {
  const { email, exists } = route.params

  return (
    <View style={ styles.container }>
      {!exists && <Heading size="xl">Welcome to Mario's</Heading>}
      {!exists && <Text size="lg">We will send updates to {email.toLowerCase().trim()}</Text>}
      {exists && <Text size="lg">Your {email.toLowerCase().trim()} is already in our mailing list</Text>}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ HomeScreen } />
          <Stack.Screen name="Welcome" component={ WelcomeScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9423A',
    padding: 0,
  },
  redRow: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9423A',
    width: '100%',
  },
  whiteRow: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  greenRow: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#47894b',
    width: '100%',
  },
  textBox: {
    backgroundColor: 'white',
    width: 250,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#D3D3D3',
    width: 250,
  },
  image: {
    width: 405, 
    height: 259,
  },
});

export default App;