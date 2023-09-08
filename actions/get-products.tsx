
import { Inventory } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/inventories`;

interface Query {
	categoryId?: string;
	manufacturerId?: string;
	sizeId?: string;
	isFeatured?: string;
}

const getProducts = async (query: Query): Promise<Inventory[]> => {
	const url = qs.stringifyUrl({
		url: URL,
		query: {
			manufacturerId: query.manufacturerId,
			sizeId: query.sizeId,
			categoryId: query.categoryId,
			isFeatured: query.isFeatured,
		},
	});
	const res = await fetch(url);

	return res.json();
};

export default getProducts;
