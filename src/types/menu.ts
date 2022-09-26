export type Menu = {
  id: number;
  text: string;
  path: string;
  submenu?: SubMenu[];
  megamenu?: Menu[];
};

export type MegaMenu = {
  id: number;
  text: string;
  path: string;
  icon: string;
  isLive: boolean;
};

export type SubMenu = {
  id: number;
  text: string;
  path: string;
  icon: string;
  isLive: boolean;
};
