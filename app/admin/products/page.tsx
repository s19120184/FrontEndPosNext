import ProductsTable from "@/componets/products/ProductsTable";
import Heading from "@/componets/ui/Heading";
import Pagination from "@/componets/ui/Pagination";
import { ProductsResponseSchema } from "@/src/schemas";
import { isValidPage } from "@/src/utils";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function getProducts(take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
  try {
    const req = await fetch(url);
    const json = await req.json();

    const data = ProductsResponseSchema.parse(json);

    return data;
  } catch (error) {
    console.log(error);
  }
}

type SearchParams = Promise<{ page: string }>;

export default async function ProdutsPage({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  //para la paginacion
  const { page } = await searchParams;
  if (!isValidPage(+page)) redirect("/admin/products?page=1");

  const productsPerPage = 10;
  const skip = (+page - 1) * productsPerPage;

  const data = await getProducts(productsPerPage, skip);

  let totalPages = 0;
  //redondea hacia arriba obtenemos el total de paginas para la paginacion
  if (data) {
    totalPages = Math.ceil(data?.total / productsPerPage);
    if (+page > totalPages) redirect("/admin/products?page=1");
  }

  return (
    <>
      <Link
        href="/admin/products/new"
        className="rouded bg-green-400 font-bold py-2 px-10"
      >
        Nuevo Producto
      </Link>

      <Heading>Administra productos</Heading>
      {data && (
        <>
          <ProductsTable products={data.produts} />
          <Pagination
            page={+page}
            totalPages={totalPages}
            baseUrl="/admin/products"
          />
        </>
      )}
    </>
  );
}
