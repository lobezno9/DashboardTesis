import { BaseIn } from "../../general/BaseIn";
import { UserType } from "../../models/UserType";

export class AddUserTypeIn extends BaseIn {
    userType: UserType
}