import data from "@/products.json"

export type ParamsType = Promise<{ id: string, category:string }>;

const page = async ({ params }: {params: ParamsType}) => {
  const { category, id } = await params;
  const item = data.products.filter((item) => item.id === parseInt(id))[0];
  return <div>The id of the product {category} is {id} and the product name is {item.name}</div>;
};

export default page;
