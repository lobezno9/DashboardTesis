import { BaseOut } from "../../general/BaseOut";
import { Profile } from "../../models/Profile";

export class GetAllProfileOut extends BaseOut {
    listProfile: Profile[]
}