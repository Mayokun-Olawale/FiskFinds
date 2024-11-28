
import mongoose from "mongoose";
export async function connect(){
  // process.env.MONGODB_URL as string
   return mongoose.connect("mongodb+srv://Mayokun:9LkB9KkqkCJHpyDD@cluster0.lvgji.mongodb.net/fisk_finds");
  
}

export const categories = [
  {key:'electronics', label:'Electronics'},
  {key: 'decor', label: 'Furniture and Decor'},
  {key:'food', label:'Food and Beverage'},
  {key: 'clothes', label: 'Clothing and Shoes'},
  {key:'care', label: 'Health,Personal care, and Beauty'},
  {key:'other', lable: 'Other'},

];

export function formatMoney(amount:number): string{
  return '$' + Intl.NumberFormat('US', {currency: 'USD'}).format(amount); 
}

export function formatDate(date: Date): string{
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}