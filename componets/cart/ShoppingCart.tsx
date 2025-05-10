"use client";
import { useStore } from "@/src/store";
import ShoppingCartItem from "./ShoppingCartItem";
import Amaout from "./Amaout";
import CuponForm from "./CuponForm";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state)=> state.discount)

  return (
    <>
      {contents.length ? (
        <>
          <h2 className="text-4xl font-bold text-gray-900">Resumen de venta</h2>
          <ul
            role="list"
            className="mt-6 divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500 "
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          {/* mostrar el total a pagar */}
          <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium  text-gray-500">
            
            {discount ? ( <Amaout  label="Descuento" amoutn={discount} discount />): null}
            <Amaout  label="Total a pagar" amoutn={total} />
           
          </dl>
          <CuponForm/>
        </>
      ) : (
        <p className="text-center font-bold text-2xl">Carrito esta vacio</p>
      )}
    </>
  );
}
