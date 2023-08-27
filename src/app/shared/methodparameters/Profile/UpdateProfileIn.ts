import { BaseIn } from "../../general/BaseIn";
import { Option } from "../../models/Option";
import { Profile } from "../../models/Profile";

export class UpdateProfileIn extends BaseIn {
    profile?: Profile
    listOption?: Option[]
}