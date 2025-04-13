"use client";

import { Category } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";




const NavMenuItem = ({ item }: { item: Category }) => {
	const pathname = usePathname();
	const href = `/search/${item.id}`;
	const active = pathname === href;

	return (
		<li>
			<Link
				href={href}
				className={clsx(
					" hover:text-black hover:underline dark:hover:text-neutral-300  md:text-sm",
					{
						"text-black dark:text-neutral-300": active,
					}
				)}
			>
				{item.name}
			</Link>
		</li>
	);
};

export default function SubNav({ menu }: { menu: Category[] }) {

	return (
		<>
			<nav className="sticky bg-transparent backdrop-blur-md z-50 top-0 flex border-b border-transparent bg-zinc-100 text-sm mb-10">
				<ol
					
					className="relative flex gap-4 px-6 py-4"
				>
					{menu.map((item) => (
						<NavMenuItem key={item.id} item={item} />
					))}
				</ol>
			</nav>
		</>
	);
}
