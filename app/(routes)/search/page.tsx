import getProducts, { Query } from "@/actions/get-products";
import Grid from "@/components/grid";
import ProductGridItems from "@/components/product-grid-items";

import { defaultSort, sorting } from "@/lib/constants";

export const runtime = "edge";
export const revalidate = 0;

export const metadata = {
	title: "All available products",
	description: "Search for products in the store.",
};

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { sort, q: searchValue } = searchParams as { [key: string]: string };
	const { sortKey, reverse } =
		sorting.find((item) => item.slug === sort) || defaultSort;

	const products = await getProducts({
		sortKey,
		reverse,
		query: searchValue,
	} as Query);
	const resultsText = products.length > 1 ? "results" : "result";

	return (
		<>
			{searchValue ? (
				<p className="mb-4">
					{products.length === 0
						? "There are no products that match "
						: `Showing ${products.length} ${resultsText} for `}
					<span className="font-bold">&quot;{searchValue}&quot;</span>
				</p>
			) : null}
			{products.length > 0 ? (
				<Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
					<ProductGridItems products={products} />
				</Grid>
			) : null}
		</>
	);
}
