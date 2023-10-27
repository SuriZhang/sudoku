import { propagateServerField } from "next/dist/server/lib/render-server";
import React from "react";

// type MarkProps = {
// 	// onAddMark: (newMark: number) => void;
// 	// marks: number[]; // Array of marks for the cell
// };

// function Mark(): JSX.Element {
// 	return (
// 		<div className="flex w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
// 			<div className="row-start-1 col-start-1 text-xs text-grey-300 justify-center text-center">
// 				1
// 			</div>
// 			<div className="row-start-2 col-start-1 text-xs text-grey-300 justify-center text-center">
// 				2
// 			</div>
// 			<div className="row-start-3 col-start-1 text-xs text-grey-300 justify-center text-center">
// 				3
// 			</div>
// 			<div className="row-start-1 col-start-2 text-xs text-grey-300 justify-center text-center">
// 				4
// 			</div>
// 			<div className="row-start-2 col-start-2 text-xs text-grey-300 justify-center text-center">
// 				5
// 			</div>
// 			<div className="row-start-3 col-start-2 text-xs text-grey-300 justify-center text-center">
// 				6
// 			</div>
// 			<div className="row-start-1 col-start-3 text-xs text-grey-300 justify-center text-center">
// 				7
// 			</div>
// 			<div className="row-start-2 col-start-3 text-xs text-grey-300 justify-center text-center">
// 				8
// 			</div>
// 			<div className="row-start-3 col-start-3 text-xs text-grey-300">
// 				9
// 			</div>
// 		</div>
// 	);
// }

// export default Mark;



export const Mark = (props: {
	markValues: number[];
	onMarkValueEnter: (value: number) => void;
}) => {
	
	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		// Check if the key pressed is a number
		if (event.key.match(/[1-9]/)) {
			// Convert the key to a number
			const value = parseInt(event.key);
			props.onMarkValueEnter(value);
		}
	};
		
	return <div onKeyDown={handleOnKeyDown} />;
};
