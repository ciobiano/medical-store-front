import getBillboard from "@/actions/get-billboard";
import getCategory from "@/actions/get-category";
import getProducts from "@/actions/get-products";
import Grid from "@/components/grid";
import GridRow from "@/components/grid/grid-row";
import ProductGridItems from "@/components/product-grid-items";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { Inventory } from "@/types";
import { Suspense } from "react";

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
	try {
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
	} catch (error) {
		console.error("Error fetching category data:", error);
		throw new Error("Failed to fetch category data");
	}
};

const CategorySection: React.FC<{
	billboardData: BillboardData;
	category: CategoryData;
	products: Inventory[];
}> = ({ billboardData, category, products }) => (
	<>
		<Suspense fallback={<div>Loading...</div>}>
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
	try {
		const [data1, data2] = await Promise.all([
			fetchCategoryData(
				"ada1dbc4-0c10-49b5-ba6a-faceac2fb3d7",
				"55166be2-c98e-4db3-8108-eecb7e6b3216"
			),
			fetchCategoryData(
				"44471523-6145-4715-9b82-3431ed2799ee",
				"fcd762dd-7bb7-484d-bede-5089d44a8c72"
			),
		]);

		return (
			<Container>
				<div className="space-y-24 pb-10 mt-6">
					{data1.billboard && data1.category && (
						<CategorySection
							billboardData={data1.billboard}
							category={{
								name: data1.category.name,
								description:
									"Acid reflux is a common medical condition in which stomach contents leak into the tube connecting the mouth to the stomach.",
							}}
							products={data1.products}
						/>
					)}
					<GridRow />
					{data2.billboard && data2.category && (
						<CategorySection
							billboardData={data2.billboard}
							category={{
								name: data2.category.name,
								description:
									"Depression is a common medical condition that affects how people feel. Everyone experiences occasional times of sadness.",
							}}
							products={data2.products}
						/>
					)}
				</div>
			</Container>
		);
	} catch (error) {
		console.error("Error loading home page:", error);
		return <div>Failed to load home page</div>;
	}
};

export default HomePage;
