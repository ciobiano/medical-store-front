import clsx from "clsx";
import { Size } from "@/types";

export function VariantSelector({ size }: { size: Size }) {
	return (
		<dl className="mb-8">
			<dt className="mb-4 text-sm uppercase tracking-wide">Size</dt>
			<dd className="flex flex-wrap gap-3">
				<div
					title={`${size.name} ${size.value}`}
					className={clsx(
						"flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
						{
							"cursor-default ring-2 ring-[--default-2]": true,
						}
					)}
				>
					{size.value}
				</div>
			</dd>
		</dl>
	);
}
