
import { SortFilterItem } from "@/lib/constants";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";
import Container from "@/components/ui/container";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { name: string; path: string ; title: string};

function FilterItemList({ list }: { list: ListItem[] }) {
	return (
		<>
			{list.map((item: ListItem, i) => (
				<FilterItem key={i} item={item} />
			))}
		</>
	);
}

export default function FilterList({
	list,
	title,
}: {
	list: ListItem[];
	title?: string;
}) {
	return (
		<Container>


			<nav className="">
				{title ? (
					<h3 className="hidden text-xs text-neutral-500 md:block">{title}</h3>
				) : null}
				<ul className="hidden md:block">
					<FilterItemList list={list} />
				</ul>
				<ul className="md:hidden">
					<FilterItemDropdown list={list} />
				</ul>
			</nav>
		</Container>
	);
}
