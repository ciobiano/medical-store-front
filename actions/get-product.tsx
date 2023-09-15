import { Inventory } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/inventories`;

const getProduct = async (id: string): Promise<Inventory> => {
	const res = await fetch(`${URL}/${id}`);

	return res.json();
};

export default getProduct;
