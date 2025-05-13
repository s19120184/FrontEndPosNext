import { Product } from "@/src/schemas";
import { revalidatePath } from "next/cache";

export default function DeleteProductForm({
  productId
}: {
  productId: Product["id"];
}) {
  //por que es un componte del servidor podemos hacer esto
  const handleDeleteProduct = async () => {
    "use server";
    try {
      const url = `${process.env.API_URL}/products/${productId}`;
      const req = await fetch(url, {
        method: "DELETE"
      });
      const response = await req.json();
      console.log(response)
      
      revalidatePath("admin/products?page=1");
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <form action={handleDeleteProduct}>
      <input
        type="submit"
        className="text-red-600 hover:text-red-800 cursor-pointer"
        value="Eliminar"
      />
    </form>
  );
}
