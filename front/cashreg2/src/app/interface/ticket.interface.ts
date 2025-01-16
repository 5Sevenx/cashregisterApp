import { Store } from "./store.interface";

export interface ticket {
  iD_Store: any;
  id:number,
  price:number,
  date: Date,
  store: Store
}
