import { Link } from "react-router-dom";

const Nav = () => {
  const scrollTo = (sectionId) => {
    console.log("Scrolling to: ", sectionId);
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <ul>
        <li onClick={() => scrollTo("home")}>Home</li>
        <li onClick={() => scrollTo("about")}>About</li>
        <li onClick={() => scrollTo("contact")}>contact</li>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
