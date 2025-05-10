
export async function POST(req:Request) {
    const coupon = await req.json()
    const url = `${process.env.API_URL}/coupons/apply-coupon`

  try {
     const request = await fetch(url, {
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(coupon)
    })

    const respose =await request.json()
    if(!request.ok){
        console.log("Error response")
    }


    return Response.json({...respose, status : request.status})
    
  } catch (error) {
     return{
        error
     }
  }

   

}