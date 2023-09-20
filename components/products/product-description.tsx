import Price from "@/components/price";
import Prose from "@/components/prose";

import { VariantSelector } from "./variant-selector";
import { Inventory } from "@/types";
import { AddToCart } from "@/components/cart/add-to-cart";

export function ProductDescription({ product }: { product: Inventory }) {
	const availableForSale = !product.isOutOfStock;
	return (
		<>
			<div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
				<h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
				<div className="mr-auto w-auto rounded-full bg-[--default-3] p-2 text-sm text-white">
					<Price amount={product.price} currencyCode={"NGN"} />
				</div>
			</div>
			<VariantSelector size={product.size} />

			{product.description ? (
				<Prose
					className="mb-6 text-sm leading-tight dark:text-white/[60%]"
					html={product.description}
				/>
			) : null}

			<AddToCart inventory={product} availableForSale={availableForSale} />
		</>
	);
}
