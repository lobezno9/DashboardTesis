import { BaseIn } from "../../general/BaseIn";
import { UserType } from "../../models/UserType";

export class UpdateUserTypeIn extends BaseIn {
    userType: UserType
}