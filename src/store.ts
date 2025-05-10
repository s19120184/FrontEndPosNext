import { create } from "zustand";
import { devtools } from "zustand/middleware"; //para poder ver el contenido del state en Redux del navegador
import { Product, ShoppingCart } from "./schemas";

interface Store {
  total: number; //total a pagar
  contents: ShoppingCart;
  addToCart: (product: Product) => void;
  updateQuantity:(id:Product['id'], quantity:number)=>void
  removeFromCart:(id:Product['id'])=>void
  calculateTotal:()=>void
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    total: 0,
    contents: [], //carrito vacio
    addToCart: (product) => {
      const { id: productId, ...data } = product;
      let contents: ShoppingCart = [];

      //retorna la posicion en el arreglo si es que existe
      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      );

      if (duplicated >= 0) {

        //verificamos que el contenodo no sea mayor a lo que hay en el inventario
        if(get().contents[duplicated].quantity >= get().contents[duplicated].inventory)return

        //buscamos las coincidencias por id y incrementamos la catidad si se encuentra 
        //de no encotrarse retornamos el item como ya estaba
        contents = get().contents.map(item => item.productId === productId ?{
            ...item,
            quantity:item.quantity +1
        }: item)

      } else {
        //tomamos una copia de contents y agregamos la nueva data
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId
          }
        ];
      }

      //escribimos en el State
      set(() => ({
        contents
      }));
      //calculamos el total
      get().calculateTotal()

    } ,
    // *actualizar la cantidad 
    updateQuantity:(id, quantity)=>{

        //tomamos una copia de item y renscribimos la cantidad 
        const contents= get().contents.map(item => item.productId ===id ? {...item ,quantity} : item)
        set(()=>({
            contents
        }))
        //calculamos el total
        get().calculateTotal()
    },
    //* eliminar del carrito
    removeFromCart:(id)=>{
        set((state)=>({
            contents: state.contents.filter(item => item.productId !== id)
        }))
        //calculamos el total
        get().calculateTotal()
    },
    //* calcular el total
    calculateTotal:() =>{
        const total = get().contents.reduce((total, item)=>total +(item.quantity* item.price),0 )
        set(()=>({
            total
        }))
    }
  }))
);
