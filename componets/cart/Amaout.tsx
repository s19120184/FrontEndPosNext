import { formatCurrency } from "@/src/utils"

type AmoutnProps ={
    label:string,
    amoutn:number
    discount?:boolean,
}
export default function Amaout({amoutn, label , discount}: AmoutnProps) {
  return (
    <div className={`${discount && 'bg-green-300 text-green-800 p-1'} flex justify-between`}>
        <dt className="font-bold">
          {label}
        </dt>
        <dd className="text-gray-900">
          {discount && '-'}  {formatCurrency(amoutn)}
        </dd>
    </div>
  )
}
