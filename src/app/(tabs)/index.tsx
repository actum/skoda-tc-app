import { Text, View } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '@/src/providers/UserContext';

export default function HomeScreen() {
  const userCtx = useContext(UserContext);
  return (
    <View style={{ paddingTop: 50 }}>
      <Text style={{ fontSize: 30 }}> HOME</Text>
      <Text style={{ fontSize: 20, padding: 20 }}>
        {' '}
        USER: {userCtx.userData?.firstName} {userCtx.userData?.lastName}
      </Text>
    </View>
  );
}
