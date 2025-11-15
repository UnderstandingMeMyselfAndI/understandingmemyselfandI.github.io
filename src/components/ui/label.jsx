import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

function Label({className, ...props}) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={className}
			{...props}
		/>
	);
}

export {Label};
