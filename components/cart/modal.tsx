import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Inventory } from "@/types"; // Import your Inventory type
import DeleteItemButton from "./delete-item-button";
import EditItemQuantityButton from "./edit-item-quantity";
import CloseCart from "./close-cart";
import Image from "next/image";
import OpenCart from "./open-cart";
import Price from "../price";


interface CartModalProps {
	cartItems: Inventory[];
}
export default function CartModal({ cartItems }: CartModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const quantityRef = useRef(0);

	const totalQuantity = cartItems.reduce(
		(acc, item) => acc + (item.quantity || 0),
		0
	);
	const cartTotal = cartItems.reduce(
		(total, item) => total + parseFloat(item.price) * (item.quantity ?? 1),
		0
	);
	// Assuming a tax rate of 10%
	const taxAmount = cartTotal * 0.1;

	// Final total including tax
	const finalTotal = cartTotal + taxAmount;

	useEffect(() => {
		if (totalQuantity !== quantityRef.current) {
			if (!isOpen) {
				setIsOpen(true);
			}
			quantityRef.current = totalQuantity;
		}
	}, [isOpen, totalQuantity]);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	return (
		<>
			<button aria-label="Open cart" onClick={openCart}>
				<OpenCart quantity={totalQuantity} />
			</button>
			<Transition show={isOpen}>
				<Dialog onClose={closeCart} className="relative z-50">
					<Transition.Child
						as={Fragment}
						enter="transition-all ease-in-out duration-300"
						enterFrom="opacity-0 backdrop-blur-none"
						enterTo="opacity-100 backdrop-blur-[.5px]"
						leave="transition-all ease-in-out duration-200"
						leaveFrom="opacity-100 backdrop-blur-[.5px]"
						leaveTo="opacity-0 backdrop-blur-none"
					>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition-all ease-in-out duration-300"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transition-all ease-in-out duration-200"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col">
							<div className="flex items-center justify-between">
								<p className="text-lg font-semibold">My Cart</p>
								<button aria-label="Close cart" onClick={closeCart}>
									<CloseCart />
								</button>
							</div>

							{!cartItems || cartItems.length === 0 ? (
								<div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
									<ShoppingCartIcon className="h-16" />
									<p className="mt-6 text-center text-2xl font-bold">
										Your cart is empty.
									</p>
								</div>
							) : (
								<div className="flex h-full flex-col justify-between overflow-hidden p-1">
									<ul className="flex-grow overflow-auto py-4">
										{cartItems.map((item, i) => {
											return (
												<li
													key={i}
													className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
												>
													<div className="relative flex w-full flex-row justify-between px-1 py-4">
														<div className="absolute z-40 -mt-2 ml-[55px]">
															<DeleteItemButton item={item} />
														</div>
														<Link
															href={`/product/${item.id}`} // Navigate to the product page
															onClick={closeCart}
															className="z-30 flex flex-row space-x-4"
														>
															<div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
																{/* Replace with your actual image URL and alt text */}
																<Image
																	className="h-full w-full object-cover"
																	alt={item.name}
																	src={
																		item.images[0]?.url || "/default-image.jpg"
																	}
																/>
															</div>

															<div className="flex flex-1 flex-col text-base">
																<span className="leading-tight">
																	{item.name}
																</span>
																<p className="text-sm text-neutral-500 dark:text-neutral-400">
																	{item.category.name}{" "}
																	{/* Assuming category has a name property */}
																</p>
																<p className="text-sm text-neutral-500 dark:text-neutral-400">
																	<Price
																		className="flex justify-end space-y-2 text-right text-sm"
																		amount={item.price}
																		currencyCode={"NGN"}
																	/>
																</p>
															</div>
														</Link>
														<div className="flex h-16 flex-col justify-between">
															<span className="w-full text-sm">
																{item.quantity ?? 0}
															</span>
															<div className="text-right text-sm">
																Subtotal: $
																{parseFloat(item.price) * (item.quantity ?? 0)}
															</div>
															<div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
																<EditItemQuantityButton
																	item={item}
																	type="minus"
																/>
																<p className="w-6 text-center">
																	<span className="w-full text-sm">
																		{item.quantity}
																	</span>
																</p>
																<EditItemQuantityButton
																	item={item}
																	type="plus"
																/>
															</div>
														</div>
													</div>
												</li>
											);
										})}
									</ul>
									<div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
										<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
											<p>Taxes</p>
											<Price
												className="text-right text-base text-black dark:text-white"
												amount={taxAmount.toString()}
												currencyCode={"NGN"}
											/>
										</div>
										<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
											<p>Shipping</p>
											<p className="text-right">Calculated at checkout</p>
										</div>
										<div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
											<p>Total</p>
											<Price
												className="text-right text-base text-black dark:text-white"
												amount={finalTotal.toString()}
												currencyCode={"NGN"}
											/>
										</div>
									</div>
									<a
										href={"/checkout"}
										className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
									>
										Proceed to Checkout
									</a>
								</div>
							)}
						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
}
