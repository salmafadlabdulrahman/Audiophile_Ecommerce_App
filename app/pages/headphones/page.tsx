import Header from "@/app/components/Header";
import data from "../../../products.json";
import Product from "@/app/components/Product";


const headphones = data.products.filter((item) => item.category === "headphones");

const page = () => {
  return (
    <div>
        <Header category="Headphones" />

        <div className="w-[90%] m-auto">
            {headphones.map((item, i) => (
                <div key={i}>
                    <Product product={item} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default page