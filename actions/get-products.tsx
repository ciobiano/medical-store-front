
import { Inventory } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/inventories`;

export interface Query {
	id?: string;
	name?: string;
	categoryId?: string;
	manufacturerId?: string;
	sizeId?: string;
	isFeatured?: boolean;	
	sortKey?: string; 
	reverse?: boolean;

}

const getProducts = async (query: Query): Promise<Inventory[]> => {
	const url = qs.stringifyUrl({
		url: URL,
		query: {
			...query,


			
		},
	});
	const res = await fetch(url);

	return res.json();
};

export default getProducts;
