import { Permission } from "./Permission";

export class Option {
    id?: number;
    url?: string;
    description?: string;
    parentId?: number;
    orderMenu?: number;
    token?: string;
    icon?: string;
    hasChild?: boolean;
    isActive?: boolean;
    isChecked?: boolean;
    listOption?: Option[];
    isToRemove?: boolean;
    isNewElement?: boolean;
    listPermission?: Permission[]
}