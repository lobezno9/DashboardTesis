import { BaseOut } from "../../general/BaseOut";
import { CountInventory } from "../../models/CountInventory";
import { CountInventoryDetail } from "../../models/CountInventoryDetai";

export class UpdateCountInventoryIn extends BaseOut {
    countInventory: CountInventory;
    listCountInventoryDetail: CountInventoryDetail[]
}