import Banners from "./components/Banners";
import Hero from "./components/Hero";
import Products from "./components/Products";


export default function Home() {
  return (
    <div>
      <Hero />
      <main className="w-[80%] md:w-[90%] m-auto"> 
        <Products />
        <Banners />
      </main>
    </div>
  );
}
