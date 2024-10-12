import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/">Saba Ahmad</NavLink>
          <ul className="flex flex-col md:p-0 m-4 md:space-x-8 md:flex-row ">
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/trad">FETCH OLD</NavLink>
            </li>
            <li>
              <NavLink to="/rq">FETCH RQ</NavLink>
            </li>
            <li>
              <NavLink to="/infinite">INFINITE SCRL</NavLink>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};
