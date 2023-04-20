import { Chef } from "./Chef";
import { Order } from "./Order";

export interface Pizza{
    id?: number;
    sort:string;
    sauce:string;
    price:number;
    weight:number;
    chef?:number | Chef;
    orders?:Order[];
    // chef_id?:number;
}