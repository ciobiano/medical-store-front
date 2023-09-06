import getCategories from "@/actions/get-categories";
import LogoSquare from "@/components/logo-square";
import { Category } from "@/types";
import Link from "next/link";
import Search from "./search";
import { GiShoppingBag } from "react-icons/gi";
import MobileMenu from "./mobile-nav";


const SITE_NAME = process.env.SITE_NAME;

export default async function Navbar() {
	const categories = await getCategories();

	return (
		<nav className="relative flex items-center justify-between p-4 lg:px-6">
			<div className="block flex-none md:hidden">
				<MobileMenu menu={categories} />
			</div>
			<div className="flex w-full items-center">
				<div className="flex w-full md:w-1/3">
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
						<ul className="hidden gap-6 text-sm md:flex md:items-center">
							{categories.map((item: Category) => (
								<li key={item.name}>
									<Link
										href={"/"}
										className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					) : null}
				</div>
				<div className="hidden justify-center md:flex md:w-1/3 ">
					<Search />
				</div>
				<div className="flex justify-end md:w-1/3">
					<GiShoppingBag />
					</div>

			</div>
		</nav>
	);
}
