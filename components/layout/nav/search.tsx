"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


import { createUrl } from "@/lib/utils";
import { GiMagnifyingGlass } from "react-icons/gi";


export default function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		setSearchValue(searchParams?.get("q") || "");
	}, [searchParams, setSearchValue]);

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const val = e.target as HTMLFormElement;
		const search = val.search as HTMLInputElement;
		const newParams = new URLSearchParams(searchParams.toString());

		if (search.value) {
			newParams.set("q", search.value);
		} else {
			newParams.delete("q");
		}

		router.push(createUrl("/search", newParams));
	}

	return (
		<form
			onSubmit={onSubmit}
			className="w-max-[550px] relative w-full lg:w-80 "
		>
			<input
				type="text"
				name="search"
				placeholder="Search for products..."
				autoComplete="on"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
			/>
			<div className="absolute right-0 top-0 mr-3 flex h-full items-center">
				<GiMagnifyingGlass/>
			</div>
		</form>
	);
}
