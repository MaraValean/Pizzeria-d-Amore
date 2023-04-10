import { Chef } from "./Chef";
import { Order } from "./Order";

export interface PizzaCount{
    id?: number;
    sort:string;
    sauce:string;
    price:number;
    weight:number;
    chef?:Chef;
    orders?:Order[];
    order_count:number;
    // chef_id?:number;
}