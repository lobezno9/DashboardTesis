import { BaseIn } from "../../general/BaseIn";
import { Product } from "../../models/Product";

export class GetProductIn extends BaseIn {
    product: Product
}