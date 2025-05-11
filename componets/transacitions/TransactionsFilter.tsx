"use client";

import { useState } from "react";

import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/src/api";
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";
import dynamic from "next/dynamic";

// el componnte se carga 100% en el cliente
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false
});

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionsFilter() {
  const [date, setDate] = useState<Value>(new Date());

  //formatear la fecha 2005-05-10
  const formattedDate = format(date?.toString() || new Date(), "yyyy-MM-dd");

  const { data, isLoading } = useQuery({
    queryKey: ["sales", formattedDate],
    queryFn: () => getSalesByDate(formattedDate)
  });

  //total de venta del dia
  const total =
    data?.reduce((total, transaction) => total + +transaction.total, 0) ?? 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
      <div className="lg:sticky lg:top-10">
        <Calendar value={date} onChange={setDate} locale="es" />
      </div>
      <div>
        {isLoading && "Cargando"}
        {data ? (
          data.length ? (
            data.map((transaction) => (
              <TransactionSummary
                key={transaction.id}
                transaction={transaction}
              />
            ))
          ) : (
            <p className="text-lg text-center">No hay ventas en esta Fecha</p>
          )
        ) : null}

        <p className="my-5 text-lg font-bold text-right">
          Total del dia{" "}
          <span className="font-normal">{formatCurrency(total)}</span>
        </p>
      </div>
    </div>
  );
}
