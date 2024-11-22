"use client";

import { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { navData } from "@/components/navigation/navigation-link-data/navigation-navbar";


export default function NavLinks({ open, setOpen }) {
	const [heading, setHeading] = useState("");
	const [subHeading, setSubHeading] = useState("");

	const closeMobile = () => {
		if (open) {
			setOpen(false);
			setHeading("");
		};
	};

	return (
		<>
			{navData.map((link) => (
				<div key={link.id} className="">
					<div className="text-left px-3 py-4 cursor-pointer group">
						<div
							className="flex justify-between items-center hover:text-mw_green lg:pr-0 group"
							onClick={() => {
								heading !== link.label ? setHeading(link.label) : setHeading("");
								setSubHeading("");
							}}
						>
							{/* nav link without submenu/ dropdown */}
							{!link.submenu &&
								<Link
									href={link.link}
									className="w-full"
								>
									<div
										className="w-full"
										onClick={() => closeMobile()}
									>
										{link.label}
									</div>
								</Link>
							}

							{/* nav link with submenu/ dropdown */}
							{link.submenu &&
								<div className="flex justify-between w-full hover:text-mw_green">
									{link.label}

									{/* arrow in main nav */}
									<span className="text-xl hidden lg:mt-1 lg:ml-2 lg:block group-hover:rotate-180 group-hover:-mt-2">
										<IoIosArrowDown />
									</span>

									{/* arrow in mobile nav */}
									<span
										className="text-xl lg:hidden"
										onClick={() => className = "group-hover:rotate-180 group-hover:-mt-2"}
									>
										<IoIosArrowDown />
									</span>
								</div>
							}
						</div>

						{link.submenu && (
							<div className="absolute top-16 hidden group-hover:lg:block hover:lg:block">
								<div className="flex flex-col bg-black gap-y-2">
									{link.sublinks.map(item => (
										<div
											key={item.id}
											className="hover:text-mw_green w-full p-5"
										>
											<Link href={item.link}>
												{item.label}
											</Link>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Mobile menus */}
					<div className={`${heading === link.label ? "lg:hidden" : "hidden"}`}>

						{/* sublinks */}
						{link.sublinks.map(item => (
							<div key={item.id}>
								<Link
									href={item.link}
									className="w-full"
									onClick={() => closeMobile()}
								>
									<div
										className="font-semibold py-4 pl-8 hover:text-mw_green w-full"
										onClick={() =>
											subHeading !== item.label
												? setSubHeading(item.label)
												: setSubHeading("")
										}
									>
										{item.label}
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			))}
		</>
	);
};
