import getBillboard from "@/actions/get-billboard";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Grid from "@/components/grid";
import GridRow from "@/components/grid/grid-row";
import ProductGridItems from "@/components/product-grid-items";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { Category } from "@/types";

export const revalidate = 0;

const HomePage = async () => {
	const CategoryId = "1521804a-0efc-4252-a76c-2079477a0024";
	const CategoryId2 = "93265030-fe89-44f4-8d1a-ee35526caac6";
	const billboard = await getBillboard("57d69bd1-792b-45e3-b9eb-b121476cb697");
	const billboard2 = await getBillboard("3fed3acc-ec4b-4235-96f5-1e3cb9709cd1");
	const product = await getProducts({
		categoryId: CategoryId,
	});
	const product2 = await getProducts({
		categoryId: CategoryId2,
	});
	const category = await getCategory(CategoryId);
	const category2 = await getCategory(CategoryId2);
	const limitedProduct = product.slice(0, 8); // Limit to 8 items
	const limitedProduct2 = product2.slice(0, 8); // Limit to 8 items

	return (
		<Container>
			<div className="space-y-20 pb-10 mt-6">
				<Billboard
					data={billboard}
					variant="type2"
					description="Acid reflux is a common medical condition in which stomach contents leak into the tube connecting the mouth to the stomach."
				/>

				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
					<GridRow />
				</div>
				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 ">
					<header className="uppercase space-y-4 md:text-lg font-semibold border-b border-gray-600 w-full text-[--default-2] ">
						{category.name}
					</header>
					<Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
						<ProductGridItems products={limitedProduct} />
					</Grid>
				</div>
				<Billboard
					data={billboard2}
					variant="type2"
					description="Depression is a common medical condition that affects how people feel. Everyone experiences occasional times of sadness."
				/>
				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
					<header className="uppercase space-y-4 md:text-lg font-semibold border-b border-gray-600 w-full text-[--default-2] ">
						{category2.name}
					</header>
					<Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
						<ProductGridItems products={limitedProduct2} />
					</Grid>
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
