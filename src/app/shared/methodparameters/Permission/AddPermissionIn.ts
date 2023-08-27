import { BaseIn } from "../../general/BaseIn";
import { Permission } from "../../models/Permission";

export class AddPermissionIn extends BaseIn {
    permission: Permission
}