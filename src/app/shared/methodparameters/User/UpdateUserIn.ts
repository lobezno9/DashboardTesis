import { BaseIn } from "../../general/BaseIn";
import { User } from "../../models/User";

export class UpdateUserIn extends BaseIn {
    public user: User;
}