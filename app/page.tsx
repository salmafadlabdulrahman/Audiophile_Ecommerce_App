import Banners from "./components/Banners";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Location from "./components/Location";
import Products from "./components/Products";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../lib/fontawesome";
import { account } from "@/lib/appwrite";
import UserProvider from "./context/UserContext";

export default function Home() {
  /*const getCurrentUser = async () => {
    if (await account.get()) {
      let user = await account.get();
      console.log(user);
    }
  };*/
  //getCurrentUser()

  return (
    
      <div>
        <Hero />
        <main className="w-[90%] xl:w-[75%] m-auto">
          <Products />
          <Banners />
          <Location />
        </main>
        <Footer />
      </div>
  );
}
