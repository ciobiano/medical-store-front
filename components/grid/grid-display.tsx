// MedicalAdviceCard.tsx

import Image from "next/image";
import React from "react";

type GridDisplayProps = {
	title: string;
	advice: string;
	imageUrl: string;
};

const GridDisplay: React.FC<GridDisplayProps> = ({
	title,
	advice,
	imageUrl,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-lg z-10 w-1/4 m-2">
			<Image
				src={imageUrl}
				alt={title}
				width={500}
				height={500}
				className="w-32 h-32 object-contain mx-auto rounded-t-lg items-center justify-center"
			/>
			<div className="p-4">
				<h3 className="font-semibold text-lg text-[--default-2]">{title}</h3>
				<p className="text-sm">{advice}</p>
			</div>
		</div>
	);
};

export default GridDisplay;
