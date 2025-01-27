export interface StoreChange{
  storeName: string;
  products: { id: number, name:string; }[];
}
