"use client";

import React, { useContext, useState } from "react";
import { Mark } from "./mark";
import { GridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "./modeContext";

interface CellProps extends GridInfo {
	onClick: (x: number, y: number) => void;
	onValueChange: (x: number, y: number, value: number) => void;
}

// information that is exclusive to current cell
export const Cell = (props: CellProps) => {
	// marks for cell
	const [markValues, setMarkValues] = useState<number[]>([
		0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);

	const currentMode = useContext(ModeContext);

	const handleOnMarkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(`e.key = ${e.key}`);

		if (e.key === "Backspace") {
			// remove last mark
			setMarkValues(markValues.slice(0, markValues.length - 1));
		} else if (e.key.match(/[1-9]/)) {
			let inputValue: number = parseInt(e.key.slice(0, 1));
			let newMarkValues = [...markValues];
			// if in INSERT MODE, treat as fill cell value, hide marks
			if (currentMode === "INSERT") {
				props.onValueChange(props.x, props.y, inputValue);
				return;
			}
			if (markValues.includes(inputValue)) {
				// if mark already exists, remove it by setting back to 0
				newMarkValues[inputValue - 1] = 0;
			} else {
				// add mark to the cell
				newMarkValues[inputValue - 1] = inputValue;
			}
			setMarkValues(newMarkValues);
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

	const renderMarks = (allowEdit: boolean) => {
		return (
			<div
				tabIndex={allowEdit ? 0 : -1}
				className={`flex h-full w-full justify-center aspect-square 
                    border boarder-1 border-black p-0 text-sm text-center
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
