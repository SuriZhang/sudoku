import { on } from "events";
import { propagateServerField } from "next/dist/server/lib/render-server";
import React from "react";
import { GridInfo } from "./useCalculateGridInfo";

interface MarkProps extends GridInfo {
	markValue: number;
}

export const Mark = (props: MarkProps) => {
	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		// Check if the key pressed is a number
		if (event.key.match(/[1-9]/)) {
			// Convert the key to a number
			const value = parseInt(event.key);
			// props.onMarkValueEnter(value);
		}
	};

	return (
		<div className={`row-start-${Math.floor((props.markValue - 1) / 3)+1} col-start-${(props.markValue - 1) % 3+1}`}>
			{props.markValue === 0? "": props.markValue} 
		</div>
	);
};
