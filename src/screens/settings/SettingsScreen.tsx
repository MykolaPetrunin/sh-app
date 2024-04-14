import React, { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { settingsMenu } from './config/settingsMenu';
import { MenuItem } from './interfaces/menuItem';
import { Card } from 'react-native-paper';
import { SettingsMenuActions } from './enums/settingsMenuActions';
import { useLogout } from './hooks/useLogout';

export const SettingsScreen: FC = () => {
  const { logOut } = useLogout();
  const actionHandler = async (action: SettingsMenuActions) => {
    if (action === SettingsMenuActions.LogOut) {
      await logOut();

      return;
    }
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 20, maxHeight: '100%', gap: 16 }}
      >
        <Text>SettingsScreen</Text>
        <FlatList<MenuItem>
          style={{ flex: 1 }}
          data={settingsMenu}
          renderItem={({ item }) => (
            <View style={{ padding: 4 }}>
              <Card onPress={() => actionHandler(item.action)}>
                <Card.Title title={item.title} />
              </Card>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
