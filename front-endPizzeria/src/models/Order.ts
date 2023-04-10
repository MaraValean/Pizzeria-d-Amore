import { Pizza } from "./Pizza";

export interface Order{
    id:number;
    total_amount:number;
    payment_method:string;
    table:number;
    status:string;
    time:Date;
    pizzas:Pizza[]
    
}