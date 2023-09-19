import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import useCart from "@/hooks/use-cart"; // Import your useCart hook
import LoadingDots from "@/components/load-dots";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Inventory } from "@/types";



interface AddToCartProps {
	inventory: Inventory;
	availableForSale: boolean;
}

export function AddToCart({ inventory, availableForSale }: AddToCartProps) {
	const { addItem } = useCart(); // Use your custom useCart hook
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleAddToCart = async () => {
		if (!availableForSale || !inventory.id) return;

		startTransition(() => {
			// Use your custom addItem function
			addItem({
				...inventory, // Spread to include all properties
				quantity: 1, // You can modify this based on user input
			});

			// Refresh or navigate
			router.refresh(); // Navigate to cart page or refresh
		});
	};

	return (
		<button
			aria-label="Add item to cart"
			disabled={isPending || !availableForSale || !inventory.id}
			title={!availableForSale ? "Out of stock" : undefined}
			onClick={handleAddToCart}
			className={clsx(
				"relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90",
				{
					"cursor-not-allowed opacity-60 hover:opacity-60":
						!availableForSale || !inventory.id,
					"cursor-not-allowed": isPending,
				}
			)}
		>
			<div className="absolute left-0 ml-4">
				{!isPending ? (
					<PlusIcon className="h-5" />
				) : (
					<LoadingDots className="mb-3 bg-white" />
				)}
			</div>
			<span>{availableForSale ? "Add To Cart" : "Out Of Stock"}</span>
		</button>
	);
}
