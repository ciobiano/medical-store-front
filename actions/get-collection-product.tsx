import { Inventory } from "@/types";
import getProducts, { Query } from "./get-products";

export interface CollectionQuery {
	collection: string;
	sortKey?: string;
	reverse?: boolean;
}

export const getCollectionProducts = async (
	query: CollectionQuery
): Promise<Inventory[]> => {
	const transformedQuery: Query = {
		categoryId: query.collection,
		sortKey: query.sortKey,
		reverse: query.reverse,
		// Add any other transformations here
	};
	

	return getProducts(transformedQuery);


};
