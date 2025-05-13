import AddProductForm from "@/componets/products/AddProductForm";
import ProductForm from "@/componets/products/ProductForm";
import Heading from "@/componets/ui/Heading";
import Link from "next/link";


export default function NewProductPage() {
  return (
    <>
       <Link href='/admin/products' className="rouded bg-green-400 font-bold py-2 px-10">
          Volver
       </Link>
       <Heading>Nuevo Producto</Heading>

       <AddProductForm >
           <ProductForm/>
       </AddProductForm>
    
    </>
  )
}
