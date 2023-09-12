
import { Metadata } from "next";
import { notFound } from "next/navigation";


import { defaultSort, sorting } from "@/lib/constants";
import getProducts from "@/actions/get-products";
import { CollectionQuery, getCollectionProducts } from "@/actions/get-collection-product";
import ProductGridItems from "@/components/product-grid-items";
import Grid from "@/components/grid";

export const runtime = "edge";

export async function generateMetadata({
	params,
}: {
	params: { collection: string };
}): Promise<Metadata> {
	const collectionQuery: CollectionQuery = { collection: params.collection };
	const inventories = await getCollectionProducts(collectionQuery);

	if (!inventories || inventories.length === 0) return notFound();

	// Use the first inventory item to generate metadata
	const firstInventory = inventories[0];
	const category = firstInventory.category;

	return {
		title: category.name,
		description: `${category.name} products`,
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

	const products = await getCollectionProducts({
		collection: params.collection,
		sortKey,
		reverse,
	});

	return (
		<section>
			{products.length === 0 ? (
				<p className="py-3 text-lg">{`No products found in this collection`}</p>
			) : (
				<Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					<ProductGridItems products={products} />
				</Grid>
			)}
		</section>
	);
}
