import { FC } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
export const PageLoader: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};
