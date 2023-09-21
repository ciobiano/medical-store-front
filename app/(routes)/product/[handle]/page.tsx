import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { GridTileImage } from "@/components/grid/tile";
import { Gallery } from "@/components/products/gallery";
import { ProductDescription } from "@/components/products/product-description";
import { Image } from "@/types";
import Link from "next/link";
import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";

export const runtime = "edge";

export async function generateMetadata({
	params,
}: {
	params: { handle: string };
}): Promise<Metadata> {
	const product = await getProduct(params.handle);

	if (!product) return notFound();

	return {
		title: product.name,
		description: product.description,
		
	};
}

export default async function ProductPage({
	params,
}: {
	params: { handle: string };
}) {
	const product = await getProduct(params.handle);


	if (!product) return notFound();
	const productJsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.name, // Updated to match Inventory type
		description: product.description, // Updated to match Inventory type
		image: product.images[0]?.url, // Updated to match Inventory type
		offers: {
			"@type": "AggregateOffer",
			availability:
				product.stock > 0 // Updated to match Inventory type
					? "https://schema.org/InStock"
					: "https://schema.org/OutOfStock",
			priceCurrency: "NGN", // You might want to update this
			highPrice: product.price, // Updated to match Inventory type
			lowPrice: product.price, // Updated to match Inventory type
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(productJsonLd),
				}}
			/>
			<div className="mx-auto max-w-screen-2xl px-4">
				<div className="flex flex-col rounded-lg border border-neutral-200 bg-slate-100 p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
					<div className="h-full w-full basis-full lg:basis-4/6">
						<Gallery
							images={product.images.map((image: Image) => ({
								src: image.url,
								altText: image.id,
							}))}
						/>
					</div>

					<div className="basis-full lg:basis-2/6">
						<ProductDescription product={product} />
					</div>
				</div>
				<Suspense>
					<RelatedProducts id={product.id} />
				</Suspense>
			</div>
		</>
	);
}

async function RelatedProducts({ id }: { id: string }) {
	const relatedProducts = await getProducts({isFeatured: true});

	if (!relatedProducts.length) return null;

	return (
		<div className="py-8">
			<h2 className="mb-4 text-2xl font-bold">Related Products</h2>
			<ul className="flex w-full gap-4 overflow-x-auto pt-1">
				{relatedProducts.map((product) => (
					<li
						key={product.id}
						className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
					>
						<Link
							className="relative h-full w-full"
							href={`/product/${product.id}`}
						>
							<GridTileImage
								alt={product.name}
								label={{
									title: product.name,
									amount: product.price,
									currencyCode: 'NGN',
								}}
								src={product.images[0]?.url}
								fill
								sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
							/>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
