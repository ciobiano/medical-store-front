import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Grid from "@/components/grid";
import GridRow from "@/components/grid/grid-row";
import ProductGridItems from "@/components/product-grid-items";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";


export const revalidate = 0;


const HomePage = async () => {
	
	const billboard = await getBillboard("57d69bd1-792b-45e3-b9eb-b121476cb697");
	const product = await getProducts({
		categoryId: "1521804a-0efc-4252-a76c-2079477a0024",
	});

	

	return (
		<Container>
			<div className="space-y-10 pb-10 mt-6">
				<Billboard
					data={billboard}
					variant="type2"
					description="Acid reflux is a common medical condition in which stomach contents leak into the tube connecting the mouth to the stomach."
				/>

				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
					<GridRow />
				</div>
				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
					<header className="uppercase space-y-4 gap-y-4 border-b border-gray-600 w-full ">antibotics</header>
					<Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
						<ProductGridItems products={product} />
					</Grid>
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
