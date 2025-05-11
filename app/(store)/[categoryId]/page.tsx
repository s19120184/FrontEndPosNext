import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/componets/products/ProductCard";


import React from "react";
import { redirect } from "next/navigation";


type Params = Promise<{ categoryId: string }>;

async function getProducts(categoryId: string) {

  try {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;

  const req = await fetch(url, {
    next:{  //podemos darle un identificador a la consulta
      tags:['products-by-category']
    }
  });
  const json = await req.json();
  if(!req.ok){
    redirect('/1')
  }

  const products = CategoryWithProductsResponseSchema.parse(json);
  console.log(products)
  return products;
    
  } catch (error) {
     console.log(error)
  }
  
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;

  const category = await getProducts(categoryId);

 if(category) return (
       
       <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
           {category.products.map((product)=>(
              <ProductCard key={product.id} product={product}/>
           ))}
       </div>
    );
}
