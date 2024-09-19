
import { StyleSheet, Text, View } from 'react-native';
import FormContact from './app/components/FormContact';

export default function App() {
  return (
    <View style={styles.container}>
      <FormContact/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});