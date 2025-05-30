import Nav from "./Nav";

const Home = () => {
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
        <div className="text-7xl">About</div>
      </section>

      <section
        id="contact"
        className="h-screen w-screen flex justify-center items-center bg-blue-500"
      >
        <div className="text-7xl">Contact</div>
      </section>
    </div>
  );
};

export default Home;
