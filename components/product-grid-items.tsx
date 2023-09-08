import { Inventory } from "@/types";


import Link from "next/link";
import Grid from "./grid";
import { GridTileImage } from "./grid/tile";

export default function ProductGridItems({
	products,
}: {
	products: Inventory[];
}) {
	return (
		<>
			{products.map((product) => (
				<Grid.Item key={product.id} className="animate-fadeIn">
					<Link
						className="relative inline-block h-full w-full"
						href={`/product/${product.id}`}
					>
						<GridTileImage
							alt={product.name}
							label={{
								title: product.name,
								amount: product.price,
								currencyCode: "USD",
							}}
							src={product.images[0]?.url}
							fill
							sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
						/>
					</Link>
				</Grid.Item>
			))}
		</>
	);
}
