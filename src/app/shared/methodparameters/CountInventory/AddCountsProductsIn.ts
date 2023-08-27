import { BaseIn } from "../../general/BaseIn";
import { CountsProducts } from "../../models/CountsProducts";

export class AddCountsProductsIn extends BaseIn {
    countsProducts: CountsProducts;
}