import CartModal from "./modal";
import useCart from "@/hooks/use-cart"; // Import your useCart hook

export default function Cart() {
	const { items: cartItems } = useCart();

	return <CartModal cartItems={cartItems} />;
}
