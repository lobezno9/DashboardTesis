import { BaseOut } from "../../general/BaseOut";
import { Permission } from "../../models/Permission";

export class GetPermissionOut extends BaseOut {
    listPermission: Permission[]
}