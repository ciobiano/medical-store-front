import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import useCart from "@/hooks/use-cart"; // Import your useCart hook
import LoadingDots from "../load-dots";
import { Inventory } from "@/types";

interface EditItemQuantityButtonProps {
	item: Inventory;
	type: "plus" | "minus";
}

export default function EditItemQuantityButton({
	item,
	type,
}: EditItemQuantityButtonProps) {
	const { removeItem, addItem, updateItemQuantity } = useCart(); // Use your custom useCart hook
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const handleEditQuantity = () => {
		startTransition(() => {
			if (type === "minus") {
				if (item.quantity && item.quantity > 1) {
					updateItemQuantity(item.id, item.quantity - 1);
				} else {
					removeItem(item.id);
				}
			} else {
				if (item.quantity) {
					updateItemQuantity(item.id, item.quantity + 1);
				} else {
					addItem({
						...item, // Spread to include all properties
						quantity: 1,
					});
				}
			}
			router.refresh();
		});
	};

	return (
		<button
			aria-label={
				type === "plus" ? "Increase item quantity" : "Reduce item quantity"
			}
			onClick={handleEditQuantity}
			disabled={isPending}
			className={clsx(
				"ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
				{
					"cursor-not-allowed": isPending,
					"ml-auto": type === "minus",
				}
			)}
		>
			{isPending ? (
				<LoadingDots className="bg-black dark:bg-white" />
			) : type === "plus" ? (
				<PlusIcon className="h-4 w-4 dark:text-neutral-500" />
			) : (
				<MinusIcon className="h-4 w-4 dark:text-neutral-500" />
			)}
		</button>
	);
}
