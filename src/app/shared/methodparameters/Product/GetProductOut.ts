import { BaseOut } from "../../general/BaseOut";
import { Product } from "../../models/Product";

export class GetProductOut extends BaseOut {
    listProduct: Product[]
}