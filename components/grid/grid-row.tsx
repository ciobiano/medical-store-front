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

	return (
		<div className="flex flex-row justify-around">
			{adviceData.map((advice, index) => (
				<GridDisplay key={index} {...advice} />
			))}
		</div>
	);
};

export default GridRow;
