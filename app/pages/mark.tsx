import { on } from "events";
import { propagateServerField } from "next/dist/server/lib/render-server";
import React from "react";
import { GridInfo } from "./useCalculateGridInfo";

interface MarkProps extends GridInfo {
	markValue: number;
}

export const Mark = (props: MarkProps) => {
	return (
		<div
			className={`row-start-${
				Math.floor((props.markValue - 1) / 3) + 1
			} col-start-${((props.markValue - 1) % 3) + 1}
		row-span-1 col-span-1`}>
			{props.markValue === 0 ? "" : props.markValue}
		</div>
	);
};
