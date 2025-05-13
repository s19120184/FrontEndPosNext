import Heading from '@/componets/ui/Heading'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='text-center'>
        <Heading>Producto No encontrado</Heading>
        <p>Tal vez quieras volver a:  <Link className='text-green-400' href={"/admin/products"}>Productos</Link></p>
    </div>
  )
}
