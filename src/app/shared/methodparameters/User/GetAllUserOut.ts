import { BaseOut } from "../../general/BaseOut";
import { User } from "../../models/User";

export class GetAllUserOut extends BaseOut {
    public listUser: User[];
}