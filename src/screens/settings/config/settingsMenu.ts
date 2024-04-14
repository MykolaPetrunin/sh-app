import { MenuItem } from '../interfaces/menuItem';
import { SettingsMenuActions } from '../enums/settingsMenuActions';

export const settingsMenu: MenuItem[] = [
  {
    title: 'Logout',
    action: SettingsMenuActions.LogOut,
  },
];
