import Nav from "./Nav";
import About from "./About";
import Recipes from "./Recipes";

const Landing = () => {
  return (
    <div>
      <Nav />

      <section
        id="home"
        className="h-screen w-screen flex items-center justify-center bg-yellow-500"
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
        <Recipes />
      </section>
    </div>
  );
};

export default Landing;
