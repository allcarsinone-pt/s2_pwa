import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAuth } from '../AuthProvider';
const Navbar = ({ username }: { username: string | null }) => {
  let showUsername = null
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
      <a className="navbar-brand" href="#">
        <Image src="/logotipo.svg" alt="logo" width={100} height={50} />
      </a>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/vehicles">
            Vehicles
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/users">
            Users
          </Link>
        </li>

        <li className="nav-item">
          {username &&

            <div className={`dropdown ${isOpen ? 'show' : ''}`}>
              <a
                className="nav-link dropdown-toggle"
                href="#"

                role="button"
                id="dropdownMenuLink"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                {username}
              </a>


              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <button className="dropdown-item" onClick={() => auth.logOut()}>
                  Logout
                </button>

              </div>
            </div>}
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;