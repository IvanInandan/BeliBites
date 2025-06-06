import Nav from "./Nav";
import About from "./About";
import Collection from "./Collection";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div>
      <Nav />

      <section
        id="home"
        className="h-screen w-screen flex items-center justify-center bg-[#f2f1e4]"
      >
        <div className="text-7xl">Home</div>
      </section>

      <section
        id="about"
        className="h-screen w-screen flex justify-center items-center bg-red-500"
      >
        <About />
      </section>

      <section
        id="recipes"
        className="h-screen w-screen flex justify-center items-center bg-blue-500"
      >
        <Collection />
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
