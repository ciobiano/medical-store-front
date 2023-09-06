import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";


export const revalidate = 0;
const BillboardId = "34a2fe03-80d3-4d57-ad96-7bdac2d161f7";

const HomePage = async () => {
	
	const billboard = await getBillboard(BillboardId);

	return (	
		<Container>
			<div className="space-y-10 pb-10">
				<Billboard
					data={billboard}
					variant="type2"
					description="Welcome to our community of smart shoppers! If you're looking for high-quality products at unbeatable prices, you've come to the right place."
				/>

				<div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
					
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
