export interface ISubMenuElement {
    text: string;
    path: string;
    icon?: any;
  }
  
export interface IMenuElement {
    id: string;
    icon: any;
    text: string;
    subMenus: ISubMenuElement[];
  }
