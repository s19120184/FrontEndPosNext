import { create } from "zustand";
import { devtools } from "zustand/middleware"; //para poder ver el contenido del state en Redux del navegador
import { Coupon, Product, ResponseSchemaCoupon, ShoppingCart } from "./schemas";
import { redirect } from "next/navigation";



interface Store {
  total: number; //total a pagar
  discount:number;
  contents: ShoppingCart;
  coupon:Coupon; //state para el cupon
  addToCart: (product: Product) => void;
  updateQuantity:(id:Product['id'], quantity:number)=>void
  removeFromCart:(id:Product['id'])=>void
  calculateTotal:()=>void
  applyCoupon:(couponName:string)=>Promise<void>
  applyDiscount:()=> void
  clearOrder:()=>void
}

const initialState={
    total: 0,
    discount:0,
    contents: [], //carrito vacio
    coupon:{
       percentage:0,
       name:'',
       message:''
    },
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
     ...initialState,
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
            contents: state.contents.filter(item => item.productId !== id),
        }))

        if(!get().contents.length){
            get().clearOrder()
        }
        //calculamos el total
        get().calculateTotal()
        
    },
    //* calcular el total
    calculateTotal:() =>{
        const total = get().contents.reduce((total, item)=>total +(item.quantity* item.price),0 )
        set(()=>({
            total
        }))

        if(get().coupon.percentage){
           get().applyDiscount()
        }
    },
    // *aplicar cupones
    applyCoupon:async(couponName)=>{
        console.log(couponName)
        const req = await fetch('/coupons/api',{
           method:'POST',
           body:JSON.stringify({
              coupon_name: couponName
           })
        })

        const json = await req.json()
        const coupon = ResponseSchemaCoupon.parse(json)

        if(!req.ok){
           console.log('Error consulta a la api')
           redirect('/1')
        }

        //guardamos en el state los datos del cupon
        set(()=>({
           coupon
        }))
       
        if(coupon.percentage){
          get().applyDiscount()
        }
        
         
    },
    // *aplicar el descuento del cupon
    applyDiscount:()=>{
         const subTotal = get().contents.reduce((total, item)=> total +(item.quantity * item.price),0)
         const discount= (get().coupon.percentage /100) * subTotal
         const total = subTotal -discount

         set(()=>({
             discount,
             total
         }))
    },
    //* limpiar la order
    clearOrder:()=>{
        set(()=>({
          ...initialState
        }))
    }
  }))
);
