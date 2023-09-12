import clsx from "clsx";
import { Suspense } from "react";
import FilterList, { ListItem } from "./filter";
import getCategories from "@/actions/get-categories";
import { Category} from "@/types"; // Import ListItem

// Mapping function
function mapCategoriesToListItems(categories: Category[]): ListItem[] {
	return categories.map((category) => ({
		...category,
		path: `/search/${category.id}`, 
		title: category.name, 
	}));
}


async function CollectionList() {
	const collections = await getCategories();
	const listItems = mapCategoriesToListItems(collections); 
	return <FilterList list={listItems} title="Collections" />;
}


const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
	return (
		<Suspense
			fallback={
				<div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
					<div className={clsx(skeleton, activeAndTitles)} />
					<div className={clsx(skeleton, activeAndTitles)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
					<div className={clsx(skeleton, items)} />
				</div>
			}
		>
			<CollectionList />
		</Suspense>
	);
}
