export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Inventory {
	id: string;
	category: Category;
	isOutOfStock: boolean;
	stock: number;
	quantity?: number;
	name: string;
	price: string;
	isFeatured: boolean;
	size: Size;
	description: string;
	manufacturer: Manufacturer;
	images: Image[];
}
export interface Image {
	id: string;
	url: string;
}

export interface Size {
	id: string;
	name: string;
	value: string;
}


export interface Manufacturer {
	id: string;
	name: string;

}

