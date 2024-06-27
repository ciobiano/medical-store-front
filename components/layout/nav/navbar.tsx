import getCategories from "@/actions/get-categories";
import LogoSquare from "@/components/logo-square";
import { Category } from "@/types";
import Link from "next/link";
import Search from "./search";
import MobileMenu from "./mobile-nav";
import { Suspense } from "react";
import OpenCart from "@/components/cart/open-cart";
import Cart from "@/components/cart";
import Container from "@/components/ui/container";

const SITE_NAME = process.env.SITE_NAME;

export default async function Navbar() {
	const categories = await getCategories();

	const shuffle = (array: Category[]) => array.sort(() => Math.random() - 0.5);
	const randomFourCategories = shuffle([...categories]).slice(0, 2);

	return (
		<Container>

		<nav className="relative flex items-center justify-between p-4 lg:px-6">
			<div className="block flex-none md:hidden">
				<MobileMenu menu={categories} />
			</div>
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full md:w-1/3 -ml-2">
					<Link
						href="/"
						className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
					>
						<LogoSquare />
						<div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
							{SITE_NAME}
						</div>
					</Link>
					{categories.length ? (
						<ul className="hidden  ml-10 text-sm justify-between w-full max-w-lg md:flex md:items-center ">
							<li className="flex ">
								<Link
									href={"/search"}
									className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
								>
									All
								</Link>
							</li>
							{randomFourCategories.map((item: Category) => (
								<li key={item.name}>
									<Link
										href={`/search/${item.id}`}
										className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					) : null}
				</div>
				<div className="hidden justify-end  md:flex md:w-1/3 ">
					<Search />
				</div>
				<div className="flex justify-end md:w-1/3">
					<Suspense fallback={<OpenCart />}>
						<Cart />
					</Suspense>
				</div>
			</div>
		</nav>
		</Container>
	);
}
