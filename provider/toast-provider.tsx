import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
	return (
		<Toaster
			position="bottom-right"
			reverseOrder={false}
			gutter={8}
			containerClassName="p-1 "
			containerStyle={{}}
			toastOptions={{
				// Define default options
				className: "",
				duration: 5000,
				style: {
					background: "#363636",
					color: "#fff",
				},

				// Default options for specific types
				success: {
					duration: 2000,

					iconTheme: {
						primary: "green",
						secondary: "black",
					},
				},
			}}
		/>
	);
};
