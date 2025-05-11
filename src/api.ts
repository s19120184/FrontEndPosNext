import { TransactionsResponseSchema } from "./schemas";

export async function getSalesByDate(date: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`;
    const req = await fetch(url);
    const json = await req.json();

    const transaccions = TransactionsResponseSchema.parse(json);
    //console.log(transaccions);

    return transaccions;
  } catch (error) {
    console.log(error)
  }
}
