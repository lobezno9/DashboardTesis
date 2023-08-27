import { BaseOut } from "../../general/BaseOut";
import { ResportCountInventory } from "../../models/ResportCountInventory";

export class GetResportCountInventoryOut extends BaseOut {
    listResportCountInventory: ResportCountInventory[];
}