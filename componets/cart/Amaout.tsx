import { formatCurrency } from "@/src/utils"

type AmoutnProps ={
    label:string,
    amoutn:number
}
export default function Amaout({amoutn, label}: AmoutnProps) {
  return (
    <div className="flex justify-between">
        <dt className="font-bold">
          {label}
        </dt>
        <dd className="text-gray-900">
          {formatCurrency(amoutn)}
        </dd>
    </div>
  )
}
