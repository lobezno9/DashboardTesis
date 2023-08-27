import { BaseOut } from "../../general/BaseOut";
import { Warehouse } from "../../models/Warehouse";

export class GetWarehouseOut extends BaseOut {
    listWarehouse: Warehouse[]
}