import { Pizza } from "./Pizza";

export interface Chef{
    id:number;
    first_name:string;
    last_name:string;
    salary:number;
    seniority:number;
    shift:string;
    pizzas:Pizza[]
}
