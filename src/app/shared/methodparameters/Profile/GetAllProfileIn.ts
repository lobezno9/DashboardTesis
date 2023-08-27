import { BaseIn } from "../../general/BaseIn";
import { Profile } from "../../models/Profile";

export class GetAllProfileIn extends BaseIn {
    profile?: Profile;
    profileId?: number;
}