import { BaseIn } from "../../general/BaseIn";
import { Option } from "../../models/Option";

export class GetAllOptionIn extends BaseIn {
    public option?: Option;
    public profileId?: number;
    public isToProfileManager?: boolean;
}