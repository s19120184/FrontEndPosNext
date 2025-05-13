import EditProductForm from "@/componets/products/EditProductForm";
import ProductForm from "@/componets/products/ProductForm";
import Heading from "@/componets/ui/Heading";
import { ProductResponseSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id: string) {
  const url = `${process.env.API_URL}/products/${id}`;

  try {
    const req = await fetch(url);
    const json = await req.json();

    if(!req.ok){
        notFound()
    }

    const product = ProductResponseSchema.parse(json);
    
    return product;

  } catch (error) {
    console.log(error)
    notFound()
  }
}

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;

 const product =await getProduct(id);

 console.log(product)

  return (
    <>
      <Link
        href="/admin/products"
        className="rouded bg-green-400 font-bold py-2 px-10"
      >
        Volver
      </Link>
      <Heading>Editar Producto: {product.name}</Heading>

      <EditProductForm>
        <ProductForm
           product={product}
        />
      </EditProductForm>
    </>
  );
}
