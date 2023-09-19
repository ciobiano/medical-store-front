import { Inventory } from "@/types"; // Replace with your actual Inventory type import
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
	items: Inventory[];
	addItem: (item: Inventory) => void;
	removeItem: (id: string) => void;
	updateItemQuantity: (id: string, newQuantity: number) => void;
	clearCart: () => void;
};

const useCart = create(
	persist<CartState>(
		(set, get) => ({
			items: [],
			addItem: (item) => {
				const currentItems = get().items;
				const existingItemIndex = currentItems.findIndex(
					(existingItem) => existingItem.id === item.id
				);

				if (existingItemIndex !== -1) {
					// Item already exists in the cart
					const existingItem = currentItems[existingItemIndex];

					if (existingItem.stock > 0) {
						// Update the quantity of the existing item
						existingItem.stock -= 1; // Reduce stock by 1
						 existingItem.quantity = (existingItem.quantity || 0) + 1; // Increase quantity in cart by 1

						currentItems[existingItemIndex] = existingItem; // Update the item in the cart
						set({ items: [...currentItems] });
						toast.success("Item quantity updated in cart");
					} else {
						toast.error("Item out of stock");
					}
				} else {
					// Item does not exist in the cart
					if (item.stock > 0) {
						item.stock -= 1; // Reduce stock by 1
						item.quantity = 1; // Set initial quantity in cart to 1

						set({ items: [...currentItems, item] });
						toast.success("Item added to cart");
					} else {
						toast.error("Item out of stock");
					}
				}
			},

			removeItem: (id) => {
				set({ items: get().items.filter((item) => item.id !== id) });
				toast.success("Item removed from cart");
			},
			updateItemQuantity: (id, newQuantity) => {
				set((state) => ({
					items: state.items.map((item) =>
						item.id === id ? { ...item, quantity: newQuantity } : item
					),
				}));
			},
			clearCart: () => set({ items: [] }),
		}),
		{
			name: "cart-storage", // This is the key under which your state will be stored in localStorage
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useCart;
