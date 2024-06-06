import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { signIn } from 'next-auth/react';

const Navbar = ({ username }: { username: string | null }) => {
    let showUsername = null

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
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
                    {username && <p className="nav-link">{username}</p>}
                </li>
            </ul>

        </nav>
    );
};

export default Navbar;