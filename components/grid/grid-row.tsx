// MedicalAdviceRow.tsx

import React from "react";
import GridDisplay from "./grid-display";


type MedicalAdvice = {
	title: string;
	advice: string;
	imageUrl: string;
};

const GridRow: React.FC = () => {
	const adviceData: MedicalAdvice[] = [
		{
			title: "Hydration",
			advice: "Drink at least 8 glasses of water a day.",
			imageUrl: "/images/gym-bottle.png",
		},
		{
			title: "Exercise",
			advice: "Regular exercise helps maintain good health.",
			imageUrl: "/images/olympic-athlete.gif",
		},
		{
			title: "Nutrition",
			advice: "Balanced nutrition is crucial for a healthy body.",
			imageUrl: "/images/dates-fruit.png",
		},
		{
			title: "Rest",
			advice: "Adequate rest is needed for recovery and well-being.",
			imageUrl: "/images/baby.gif",
		},
	];

	 // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselAdvice = [...adviceData, ...adviceData, ...adviceData];


	return (
		<div className="w-full overflow-x-auto pb-6 pt-1">
			<ul className="flex animate-carousel gap-4">

				{carouselAdvice.map((advice, index) => (
					<li
            key={index}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >

			  <GridDisplay key={index} {...advice} />
		  </li>
				))}
			</ul>
		</div>
	);
};

export default GridRow;
