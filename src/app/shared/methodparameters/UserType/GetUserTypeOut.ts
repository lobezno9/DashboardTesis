import { BaseOut } from "../../general/BaseOut";
import { UserType } from "../../models/UserType";

export class GetUserTypeOut extends BaseOut {
    listUserType: UserType[]
}