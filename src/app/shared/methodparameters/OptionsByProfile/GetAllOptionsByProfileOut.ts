import { BaseOut } from "../../general/BaseOut";
import { OptionsByProfile } from "../../models/OptionsByProfile";

export class GetAllOptionsByProfileOut extends BaseOut {
    listOptionsByProfile: OptionsByProfile[]
}