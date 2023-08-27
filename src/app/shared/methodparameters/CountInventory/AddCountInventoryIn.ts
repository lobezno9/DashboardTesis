import { BaseIn } from "../../general/BaseIn";
import { CountInventory } from "../../models/CountInventory";


export class AddCountInventoryIn extends BaseIn {
    countInventory: CountInventory;
}