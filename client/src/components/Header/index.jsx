import { Link } from "react-router-dom"; // Importing Link from react-router-dom
import Auth from "../../utils/auth"; // Importing Auth utility

const Header = () => {
  const logout = (event) => {
    event.preventDefault(); // Preventing the default action of the event (e.g., following a link)
    Auth.logout(); // Calling the logout method from the Auth utility
  };

  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: "3rem" }}>
            Book Search
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: "1.75rem", fontWeight: "700" }}>
          Search for your fav books!
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/saved">
                Saved Books
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
