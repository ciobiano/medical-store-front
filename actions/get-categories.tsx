import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {

			const res = await fetch(URL, { cache: 'no-store' });

	if (!res.ok) {
		console.error(
			`Failed to fetch categories: ${res.status} ${res.statusText}`
		);
		throw new Error("Failed to fetch categories");
	}

	try {
		const data = await res.json();
		
		return data;
	} catch (jsonError) {
		console.error("Failed to parse categories JSON:", jsonError);
		throw new Error("Failed to parse categories JSON");
	}
};

export default getCategories;
