import { Billboard as BillboardType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";

interface BillboardProps {
	data: BillboardType; 
	variant?: "type1" | "type2";
	description?: string;
}

const Billboard: React.FC<BillboardProps> = ({
	data,
	variant = "type1",
	description,
}) => {
	if (variant === "type1") {
		return (
			<div className="p-4 sm:p-6 rounded-xl overflow-hidden">
				<div
					style={{ backgroundImage: `url(${data?.imageUrl})` }}
					className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
				>
					<div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
						<div className="font-semibold text-2xl sm:text-3xl md:text-4xl sm:max-w-xl max-w-xs text-[#D3D3D3]">
							{data?.label}
						</div>
					</div>
				</div>
			</div>
		);
	} else if (variant === "type2") {
		return (
			<div className="mt-6">
				<div className="p-4 rounded-xl flex flex-row gap-x-4  overflow-hidden md:items-center">
					<div className="flex-grow flex-shrink w-full min-w-[200px] md:items-center space-y-2 md:space-y-4 text-[--default-2]">
						<h2 className="text-xs sm:text-sm font-semibold items-start uppercase">
							Health condition
						</h2>
						<h1 className="text-lg sm:text-xl md:text-4xl font-bold ">
							{data?.label}
						</h1>
						<p className="text-xs sm:text-sm md:text-base">{description}</p>
						<Link href={"/"}>
							<div className="mt-6 flex items-center text-[--default-3] hover:text-[--default-2] ">
								Learn more
								<GoChevronRight />
							</div>
						</Link>
					</div>
					<div className="flex-shrink-0 w-[150px] sm:w-[250px] md:w-[40em]">
						<Image
							src={data?.imageUrl}
							alt="billboard"
							width={500}
							height={500}
							
						/>
					</div>
				</div>
			</div>
		);
	}

	return null; // Or some other default fallback
};

export default Billboard;
