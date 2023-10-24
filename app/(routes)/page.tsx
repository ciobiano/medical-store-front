import getBillboard from "@/actions/get-billboard";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Grid from "@/components/grid";
import GridRow from "@/components/grid/grid-row";
import ProductGridItems from "@/components/product-grid-items";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { Inventory } from "@/types";
import { Suspense } from 'react';

export const revalidate = 0;
type BillboardData = {
	 id: string;
    label: string;
    imageUrl: string;
};

type CategoryData = {
	name: string;
	description?: string;
	
};

const fetchCategoryData = async (categoryId: string, billboardId: string) => {
	const [billboard, products, category] = await Promise.all([
		getBillboard(billboardId),
		getProducts({ categoryId }),
		getCategory(categoryId),
	]);
	return {
		billboard,
		products: products.slice(0, 8),
		category,
	};
};

const CategorySection:React.FC<{
	billboardData: BillboardData;
	category: CategoryData;
	products: Inventory[];
}>
 = ({ billboardData, category, products }) => (
	<>
		<Suspense>

		<Billboard
			data={billboardData}
			variant="type2"
			description={category.description}
		/>
		</Suspense>
		<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
			<h2 className="uppercase space-y-4 md:text-lg font-semibold border-b border-gray-600 w-full text-[--default-2] ">
				{category.name}
			</h2>
			<Grid className="grid-cols-2  sm:grid-cols-2 lg:grid-cols-4">
				<ProductGridItems products={products} />
			</Grid>
		</div>
	</>
);

const HomePage = async () => {
	const [data1, data2] = await Promise.all([
		fetchCategoryData(
			"9a3216b3-a7e8-411f-8a2d-650e9b6fca5d",

			"0d151bf0-8dc2-4a86-a6ef-3b8cf3067069"
		),
		fetchCategoryData(
			"2d0151f9-a10b-4ce9-880e-6fe4f7d0315a",
			"e0274b8e-a6ac-4ad7-af44-323fdc883e99"
		),
	]);

	return (
		<Container>
			<div className="space-y-24 pb-10 mt-6">
				<CategorySection
					billboardData={data1.billboard}
					category={{
						name: data1.category.name,
						description:
							"Acid reflux is a common medical condition in which stomach contents leak into the tube connecting the mouth to the stomach.",
					}}
					products={data1.products}
				/>
				<GridRow />
				<CategorySection
					billboardData={data2.billboard}
					category={{
						name: data2.category.name,
						description:
							"Depression is a common medical condition that affects how people feel. Everyone experiences occasional times of sadness.",
					}}
					products={data2.products}
				/>
			</div>
		</Container>
	);
};

export default HomePage;
