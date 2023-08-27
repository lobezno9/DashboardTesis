import { BaseOut } from "../../general/BaseOut";
import { CountInventory } from "../../models/CountInventory";

export class GetCountInventoryOut extends BaseOut {
    listCountInventory: CountInventory;
}