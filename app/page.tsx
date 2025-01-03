import Banners from "./components/Banners";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Products from "./components/Products";

export default function Home() {
  return (
    <div>
      <Hero />
      <main className="w-[90%] xl:w-[75%] m-auto">
        <Products />
        <Banners />
        <Location />
      </main>

    </div>
  );
}