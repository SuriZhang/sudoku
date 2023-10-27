"use client";

import React, {
	KeyboardEventHandler,
	useContext,
	useEffect,
	useState,
} from "react";
import { Mark } from "./mark";
import { GridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "./modeContext";

interface CellProps extends GridInfo {
	// currentMode: string;
	onClick: (x: number, y: number) => void;
	onValueChange: (x: number, y: number, value: number) => void;
}

// information that is exclusive to current cell
export const Cell = (props: CellProps) => {
	// marks for cell
	const [markValues, setMarkValues] = useState<number[]>([]);

	const currentMode = useContext(ModeContext);

	const handleOnMarkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(`e.key = ${e.key}`);
		if (e.key.match(/[1-9]/)) {
			let inputValue: number = parseInt(e.key.slice(0, 1));
			if (markValues.includes(inputValue)) {
				console.log(`xxx, value = ${inputValue}`);
				setMarkValues(
					markValues.filter((mark: number) => mark !== inputValue)
				);
			} else {
				console.log(`yyy, value = ${inputValue}`);
				// add mark to the cell
				setMarkValues([...markValues, inputValue]);
			}
		}
		console.log(`markValues = ${markValues}`);
	};

	const handleOnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue: string | number = e.target.value;
		// validate if input is a number
		if (/^\d*$/.test(inputValue)) {
			inputValue = parseInt(inputValue.slice(0, 1));
			console.log(
				`inputValue = ${inputValue}, cellValue = ${props.value}`
			);
			console.log(`currentMode = ${currentMode}`);
			props.onValueChange(props.x, props.y, inputValue);
		}
	};

	const handleOnClick = () => {
		props.onClick(props.x, props.y);
	};

	// rendering cell
	if (currentMode === "MARK" && props.value === 0) {
		return (
			<>
				<div
					tabIndex={0}
					className={`flex h-full w-full justify-center aspect-square 
                    border boarder-1 border-black p-0 text-sm text-center grid grid-cols-3 grid-rows-3 gap-0
                    row-start-${props.x + 1} col-start-${props.y + 1}
                    ${
						(props.x + 1) % 3 === 0 &&
						props.x !== 8 &&
						"border-b-2 border-black"
					}
                    ${
						(props.y + 1) % 3 === 0 &&
						props.y !== 8 &&
						"border-r-2 border-black"
					}
                    ${props.isConflict ? "text-red-500" : "text-black"}
                    ${props.isSelected && "bg-yellow-200"}
                    `}
					onKeyDown={handleOnMarkKeyDown}
					onClick={handleOnClick}>
					{...markValues.map((markValue: number) => (
						<Mark
							key={`${props.x}*9+${props.y}+${markValue}}`}
							{...props}
							markValue={markValue}
						/>
					))}
				</div>
			</>
		);
	} else {
		return (
			<>
				<input
					className={`flex h-full w-full justify-center font-bold aspect-square 
                        border boarder-1 border-black p-0 text-2xl text-center
                        row-start-${props.x + 1} col-start-${props.y + 1}
                        ${
							(props.x + 1) % 3 === 0 &&
							props.x !== 8 &&
							"border-b-2 border-black"
						}
                        ${
							(props.y + 1) % 3 === 0 &&
							props.y !== 8 &&
							"border-r-2 border-black"
						}
                        ${props.isConflict ? "text-red-500" : "text-black"}
                        ${props.isSelected && "bg-yellow-200"}
                    `}
					value={props.value === 0 ? "" : props.value}
					onChange={handleOnValueChange}
					readOnly={!props.isEditable}
					onClick={handleOnClick}
				/>
			</>
		);
	}
};
