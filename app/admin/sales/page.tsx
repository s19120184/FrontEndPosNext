

import TransactionsFilter from '@/componets/transacitions/TransactionsFilter'
import Heading from '@/componets/ui/Heading'
import React from 'react'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { format } from 'date-fns'
import { getSalesByDate } from '@/src/api'

export default async function SalesPage() {
  const queryClient= new QueryClient()

  const today = new Date()
  const formatedDate = format(today, 'yyyy-MM-dd')

    await queryClient.prefetchQuery({
     queryKey:['sales', formatedDate],
     queryFn :() => getSalesByDate(formatedDate)
  })


  return (
    <>
       <Heading>Ventas</Heading>
       <p className='text-lg'>En esta seccion apareceran las ventas , utiliza el calendario para filtrar por dia</p>
       
       {/* rodeamos el componete done utilizaremos tankstack */}
       <HydrationBoundary state={dehydrate(queryClient)}>
            <TransactionsFilter/>
       </HydrationBoundary>

    </>
  )
}
