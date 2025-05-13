import {z} from 'zod'


//hola 
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    //categoryId: z.number()
})



//esquema para la validacin de el response al obtener los productos
export const ProductsResponseSchema= z.object({
  produts:z.array(ProductSchema),
  total:z.number()
})




export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

//esquema para validar la respuesta del producto al editar
export const ProductResponseSchema = ProductSchema.pick({
    id:true,
    name:true,
    image:true,
    price:true,
    inventory:true
 
}).extend({
     category:CategorySchema
})

export const CategoriesResponseSchema = z.array(CategorySchema)

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
});


// shopping Cart
const ShoppingCartContentsSchema = ProductSchema.pick({
    name:true,
    image:true,
    price:true,
    inventory:true
}).extend({
    productId:z.number(),
    quantity:z.number()
})


export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)//agregado

//coupon
export const ResponseSchemaCoupon = z.object({
    name:z.string().default(''),
    message:z.string(),
    percentage:z.coerce.number().min(0).max(100).default(0)

})

// esquema para guardar lo datos en la Db
const OrderContentSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number()
})
export const OrderSchema = z.object({
  total: z.number(),
  coupon: z.string(),
  contents: z.array(OrderContentSchema).min(1, {message: 'El Carrito no puede ir vacio'})
})
/** Success / Error Response */
export const SuccessResponseSchema = z.object({
  message: z.string()
})
export const ErrorResponseSchema = z.object({
  message: z.array(z.string()),
  error: z.string(),
  statusCode: z.number()
})


//esquema para contenido de la transaccion de ventas
export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.string(),
    product: ProductSchema
  })
  export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    discount: z.string().nullable(),
    coupon: z.string().nullable(),
    contents: z.array(ContentsSchema)
  })
  
  export const TransactionsResponseSchema = z.array(TransactionResponseSchema)
// ****************


// ** esquema para la validacion del formulario en agregar producto
export const ProductFormSchema = z.object({
  name: z.string()
          .min(1, {message: 'El Nombre del Producto no puede ir vacio'}),
  price: z.coerce.number({message: 'Precio no válido'})
          .min(1, {message: 'El Precio debe ser mayor a 0'}),
  inventory: z.coerce.number({message: 'Inventario no válido'})
          .min(1, {message: 'El inventario debe ser mayor a 0'}),
  categoryId: z.coerce.number({message: 'La Categoria no es válida'})
})


export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>//agregado
export type CartItem = z.infer <typeof ShoppingCartContentsSchema>//agregado
export type Coupon = z.infer<typeof ResponseSchemaCoupon>
export type Transaction=  z.infer<typeof TransactionResponseSchema> 
export type ProductEdit= z.infer<typeof ProductResponseSchema>