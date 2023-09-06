import { Billboard as BillboardType } from "@/types";
import Image from "next/image";

interface BillboardProps {
	data: BillboardType | null; // <- Allow null
	variant?: "type1" | "type2";
	description?: string;
}

const Billboard: React.FC<BillboardProps> = ({
	data,
	variant = "type1",
	description,
}) => {
	if (!data) {
		return null; // Or some placeholder
	}
	if (variant === "type1") {
		return (
			<div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
				<div
					style={{ backgroundImage: `url(${data?.imageUrl})` }}
					className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
				>
					<div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
						<div className="font-semibold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-[#D3D3D3]">
							{data?.label}
						</div>
					</div>
				</div>
			</div>
		);
	} else if (variant === "type2") {
		return (
			<div className="mt-6">
				<div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden flex flex-col-reverse sm:flex-row items-center gap-x-4 gap-y-4 sm:gap-x-2 bg-[#F5F5F7] shadow-md">
					<div className="flex-grow flex-shrink w-full md:min-w-[480px] sm:min-w-0 sm:w-auto  text-center sm:text-left">
						<h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black">
							{data?.label}
						</h1>
						<p className="text-gray-600 text-md sm:text-lg">{description}</p>
					</div>
					<div className="flex-grow-0 flex-shrink-0 md:w-full w-screen ml-24 md:ml-0 ">
						<Image
							src={data?.imageUrl}
							alt="billboard"
							width={500}
							height={500}
							layout="responsive"
						/>
					</div>
				</div>
			</div>
		);
	}

	return null; // Or some other default fallback
};

export default Billboard;
