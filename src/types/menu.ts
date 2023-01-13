export type MenuType = {
  id: number;
  text: string;
  path: string;
  submenu?: SubMenuType[];
  megamenu?: MenuType[];
};

export type MegaMenuType = {
  id: number;
  text: string;
  path: string;
  icon: string;
  isLive: boolean;
};

export type SubMenuType = {
  id: number;
  text: string;
  path: string;
  icon: string;
  isLive: boolean;
};
