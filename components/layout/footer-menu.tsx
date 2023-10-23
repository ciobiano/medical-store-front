"use client";

import { Category } from "@/types";
import clsx from "clsx";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const FooterMenuItem = ({ item }: { item: Category }) => {
	const pathname = usePathname();
 	const href = `/category/${item.id}`;
	const active = pathname === href;

	return (
		<li>
			<Link
				href={href}
				className={clsx(
					"block p-2 text-sm underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm",
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

export default function FooterMenu({ menu }: { menu: Category[] }) {
	if (!menu.length) return null;

	return (
		<nav>
			<ul>
				{menu.map((item: Category) => {
					return <FooterMenuItem key={item.name} item={item} />;
				})}
			</ul>
		</nav>
	);
}
