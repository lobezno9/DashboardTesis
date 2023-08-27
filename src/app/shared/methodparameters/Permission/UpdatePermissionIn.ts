import { BaseIn } from "../../general/BaseIn";
import { Permission } from "../../models/Permission";

export class UpdatePermissionIn extends BaseIn {
    permission: Permission
}