import Link from "next/link";
import { Suspense } from "react";
import FooterMenu from "./footer-menu";
import getCategories from "@/actions/get-categories";
import LogoIconLarge from "../icons/logo-large";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
	const currentYear = new Date().getFullYear();
	const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
	const skeleton =
		"w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700";

	const categories = await getCategories();

	const copyrightName = COMPANY_NAME || SITE_NAME || "";
	return (
		<footer className="text-sm text-neutral-500 dark:text-neutral-400">
			<div className="mx-auto flex w-full max-w-[90rem] flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-4 md:px-4 min-[1320px]:px-0">
				<Link
					className=" text-black item-center flex mr-10  dark:text-white"
					href="/"
				>
					<LogoIconLarge className="item-center my-auto mt-[-4] " />
				</Link>

				<Suspense
					fallback={
						<div className="flex h-[188px] w-[200px] flex-col gap-2">
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
						</div>
					}
				>
					<FooterMenu menu={categories} />
				</Suspense>
			</div>
			<div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
					<p>
						&copy; {copyrightDate} {copyrightName}
						{copyrightName.length && !copyrightName.endsWith(".")
							? "."
							: ""}{" "}
						All rights reserved.
					</p>
					<hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
					<p>Designed in Nigeria</p>
					<p className="md:ml-auto">
						Crafted by{" "}
						<a href="https://vercel.com" className="text-black dark:text-white">
							🧑🏽‍💻 Obiano Ralph
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
