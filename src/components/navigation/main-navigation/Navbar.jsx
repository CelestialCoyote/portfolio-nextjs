"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
//import SignInButton from "@/components/SignInButton";
import NavLinks from "./NavLinks";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 inset-x-0 z-10 bg-black text-white h-16">
            <div className="flex items-center justify-between">
                <div className="z-50 p-5 lg:w-auto w-full flex justify-between">
                    <Link href="/">
                        <div className="flex justify-center h-8 mr-4">
                            {/* <Image
                                className="w-full h-full object-contain"
                                src="/images/logos-must-wants/must-wants-logo-wtext.png"
                                alt="mustwants logo"
                                placeholder="blur"
                                blurDataURL="/images/logos-must-wants/must-wants-logo-wtext.png"
                                width="0"
                                height="0"
                                sizes="100vh"
                            /> */}
                        </div>
                    </Link>

                    {open ?
                        <AiOutlineClose
                            onClick={() => setOpen(!open)}
                            className="text-4xl text-mw_red cursor-pointer"
                        />
                        :
                        <FiMenu
                            onClick={() => setOpen(!open)}
                            className="text-4xl lg:hidden cursor-pointer"
                        />
                    }
                </div>

                <div className="lg:flex hidden items-center gap-4">
                    <NavLinks />
                </div>

                <div className="lg:block hidden mr-4">
                    {/* <SignInButton /> */}
                </div>

                {/* Mobile nav */}
                <div className={`fixed top-0 bottom-0 bg-black w-full overflow-y-auto lg:hidden py-24 pl-4
        			duration-500 ${open ? "left-0" : "left-[-100%]"}`}
                >
                    <NavLinks open={open} setOpen={setOpen} />

                    <div className="flex justify-center mt-12 py-5">
                        {/* <SignInButton /> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};
