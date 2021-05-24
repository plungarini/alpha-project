export interface DropdownOptions {
  url?: string;
  name?: string;
  icon?: string;
  action?: boolean;
  selected?: boolean;
  value?: any;
  type?: 'group';
  childrens?: DropdownOptions[];
}
