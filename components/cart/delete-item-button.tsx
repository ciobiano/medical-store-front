import { XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "@/components/load-dots";
import { useRouter } from "next/router";
import clsx from "clsx";
import useCart from "@/hooks/use-cart"; // Import your useCart hook
import { useTransition } from "react";
import { Inventory } from "@/types";



interface DeleteItemButtonProps {
	item: Inventory;
}

export default function DeleteItemButton({ item }: DeleteItemButtonProps) {
	const { removeItem } = useCart(); // Use your custom useCart hook
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleRemoveItem = () => {
		startTransition(() => {
			// Use your custom removeItem function
			removeItem(item.id);

			// Refresh or navigate
			router.push("/cart"); // Navigate to cart page or refresh
		});
	};

	return (
		<button
			aria-label="Remove cart item"
			onClick={handleRemoveItem}
			disabled={isPending}
			className={clsx(
				"ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
				{
					"cursor-not-allowed px-0": isPending,
				}
			)}
		>
			{isPending ? (
				<LoadingDots className="bg-white" />
			) : (
				<XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
			)}
		</button>
	);
}
