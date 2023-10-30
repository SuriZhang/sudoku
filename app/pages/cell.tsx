"use client";

import React, { useContext, useState } from "react";
import { Mark } from "./mark";
import { GridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "../utils/modeContext";

interface CellProps extends GridInfo {
	onClick: (x: number, y: number) => void;
	onValueChange: (x: number, y: number, value: number) => void;
}

// information that is exclusive to current cell
export const Cell = (props: CellProps) => {
	// marks for cell, used to render correct postion of marks
	const [markValues, setMarkValues] = useState<number[]>([
		0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);
	// used to keep track of order of insertion, used to remove marks using backspace
	const [marArray, setMarkArray] = useState<number[]>([]);

	const currentMode = useContext(ModeContext);

	const handleOnMarkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(`e.key = ${e.key}`);
		let newMarkValues = [...markValues];
		if (e.key === "Backspace") {
			// return the last element of the array
			let lastMark = marArray[marArray.length - 1];
			// remove last mark from markArray and markValues
			newMarkValues[lastMark - 1] = 0;
			setMarkArray(marArray.slice(0, marArray.length - 1));
		} else if (e.key.match(/[1-9]/)) {
			let inputValue: number = parseInt(e.key.slice(0, 1));
			// if in INSERT MODE, treat as fill cell value, hide marks
			if (currentMode === "INSERT") {
				props.onValueChange(props.x, props.y, inputValue);
				return;
			}
			if (markValues.includes(inputValue)) {
				// remove from markArray
				setMarkArray(marArray.filter((mark) => mark !== inputValue));
				// if mark already exists, remove it by setting back to 0
				newMarkValues[inputValue - 1] = 0;
			} else {
				// add to markArray
				setMarkArray([...marArray, inputValue]);
				// add mark to the cell
				newMarkValues[inputValue - 1] = inputValue;
			}
		}
		setMarkValues(newMarkValues);
		console.log(`markValues = ${markValues}`);
	};

	const handleOnValueKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(`e.key = ${e.key}`);
		if (e.key === "Backspace") {
			props.onValueChange(props.x, props.y, 0);
		} else if (e.key.match(/[1-9]/)) {
			let inputValue: number = parseInt(e.key.slice(0, 1));
			props.onValueChange(props.x, props.y, inputValue);
		}
	};

	const handleOnClick = () => {
		props.onClick(props.x, props.y);
	};

	const renderMarks = (allowEdit: boolean) => {
		return (
			<div
				tabIndex={allowEdit ? 0 : -1}
				className={`flex h-full w-full justify-center aspect-square 
                    border p-0 text-sm text-center
					${props.isSelected ? "border-1 border-red-500" : "boarder-1 border-black"}
                    row-start-${props.x + 1} col-start-${props.y + 1}
                    ${(props.x + 1) % 3 === 0 && props.x !== 8 && "border-b-2"}
                    ${(props.y + 1) % 3 === 0 && props.y !== 8 && "border-r-2"}
                    ${props.isConflict ? "text-red-500" : "text-black"}
                    ${props.isHighlighted && "bg-yellow-200"}
                    `}
				onKeyDown={handleOnMarkKeyDown}
				onClick={handleOnClick}>
				<div className="grid grid-cols-3 grid-rows-3 gap-0 p-0 w-full h-full">
					{...markValues.map((markValue: number, index: number) => (
						<Mark
							key={`${props.x}*9+${props.y}+${index}}`}
							{...props}
							markValue={markValue}
						/>
					))}
				</div>
			</div>
		);
	};

	const renderRegularCell = () => {
		return (
			<div
				tabIndex={props.isEditable ? 0 : -1}
				className={`h-full w-full flex items-center justify-center font-bold aspect-square 
                        border boarder-1 border-black p-0 text-2xl 
                        row-start-${props.x + 1} col-start-${props.y + 1} 
						caret-transparent
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
						${props.isSelected && "border-2 border-red"}
                        ${props.isConflict ? "text-red-500" : "text-black"}
                        ${props.isHighlighted && "bg-yellow-200"
					}
                    `}
				onKeyDown={handleOnValueKeyDown}
				onClick={handleOnClick}>
				{props.value === 0 ? "" : props.value}
			</div>
		);
	};

	// rendering cell
	if (
		props.value !== 0 ||
		(currentMode === "INSERT" &&
			props.value === 0 &&
			markValues.length === 0)
	) {
		return <>{renderRegularCell()}</>;
	} else if (
		currentMode === "INSERT" &&
		props.value === 0 &&
		markValues.length > 0
	) {
		// display regular cell
		return <>{renderMarks(false)}</>;
	} else {
		return <>{renderMarks(true)}</>;
	}
};
