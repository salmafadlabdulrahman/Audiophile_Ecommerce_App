import data from "@/products.json"
import Image from "next/image";

const page = async({ params }: { params: { id: string } }) => {
  const {id} = params
  
  const item = data.products.find((product) => product.id === parseInt(id));
  return (
    <div>
      <h1>{item?.name}</h1>
    </div>
  )
}

export default page