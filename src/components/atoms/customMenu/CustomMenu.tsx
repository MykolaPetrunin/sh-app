import { forwardRef, PropsWithChildren, useImperativeHandle, useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';

export interface CustomMenuRefObj {
  closeMenu: () => void;
}

export const CustomMenu = forwardRef<CustomMenuRefObj, PropsWithChildren>(({ children }, ref) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useImperativeHandle(ref, () => ({
    closeMenu,
  }));

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
    >
      {children}
    </Menu>
  );
});
CustomMenu.displayName = 'CustomMenu';

// export default CustomMenu;
