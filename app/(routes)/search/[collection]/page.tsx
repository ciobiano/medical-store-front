import { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultSort, sorting } from "@/lib/constants";
import getProducts from "@/actions/get-products";
import ProductGridItems from "@/components/product-grid-items";
import Grid from "@/components/grid";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "All Products",
		description: "Browse all available products.",
	};
}

export default async function CategoryPage({
	params,
	searchParams,
}: {
	params: { collection: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	const { sort } = searchParams as { [key: string]: string };
	const { sortKey, reverse } =
		sorting.find((item) => item.slug === sort) || defaultSort;

	const productQuery = {
		categoryId: params.collection, 
		sortKey,
		reverse,
		limit: 20, 
	};

	const products = await getProducts(productQuery);
	return (
		<section>
			{products.length === 0 ? (
				<p className="py-3 text-lg">{`No products found`}</p>
			) : (
				<Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
					<ProductGridItems products={products} />
				</Grid>
			)}
		</section>
	);
}
