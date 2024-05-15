import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="#">
                <Image src="./logotipo.svg" alt="logo" width={100} height={50} />
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
                    <Link className="nav-link" href="/testdrives">
                        Test Drives
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;