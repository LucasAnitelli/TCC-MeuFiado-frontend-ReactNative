import { DrawerNavigationEventMap } from "@react-navigation/drawer/lib/typescript/src/types";
import { NavigationHelpers } from "@react-navigation/native";

export interface DrawerHeaderProps {
  handleChange?: () => void;
  navigation: NavigationHelpers<Record<string, object>, DrawerNavigationEventMap>
}