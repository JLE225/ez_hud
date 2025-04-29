import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface NotifyProps {
  id?: number | string;
  title?: string;
  message: string;
  duration?: number;
  type?: string;
  icon?: IconProp;
  iconColor?: string;
  position?: string;
}
