import React from "react";
import { GridInfo } from "./useCalculateGridInfo";

interface MarkProps extends GridInfo {
	markValue: number;
}

export const Mark = (props: MarkProps) => {
	return (
		<div
			className={`row-start-${Math.floor((props.markValue - 1) / 3) + 1}
			 col-start-${((props.markValue - 1) % 3) + 1} text-sm text-black`}>
			{props.markValue === 0 ? "" : props.markValue}
		</div>
	);
};
