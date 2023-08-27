import { BaseOut } from '../../general/BaseOut';
import { Menu } from '../../models/Menu';

export class GetAllOptionMenuOut extends BaseOut {
    public listMenu: Menu[];
    public fullName: string;
    public isSuperAdmin: boolean;
    public logoCompany: any;
}