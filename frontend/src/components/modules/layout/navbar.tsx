import { Link } from "react-router-dom";
import { GithubIcon } from "../../modules/elements/icons";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div>Logo</div>
      <ul>
        <li>Link</li>
      </ul>
      <ul>
        <li className="list">
          <Link className="link" to="https://github.com">
            <GithubIcon />
          </Link>
        </li>
        <li className="list">
          <Link className="link" to="https://github.com">
            <GithubIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
