"use client";

import React, { useContext, useState, useEffect } from "react";
import { Mark } from "./mark";
import { GridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "../utils/modeContext";

interface CellProps extends GridInfo {
	onClick: (x: number, y: number, isMultiSelect: boolean) => void;
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

	const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
	
	// hold shift key to enable multi-select
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.shiftKey) {
				setIsMultiSelect(true);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (!event.shiftKey) {
				setIsMultiSelect(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);


	const handleOnMarkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// if shift is pressed, do nothing
		if (e.shiftKey) {
			return;
		}
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
		if (e.shiftKey) {
			console.log("handleOnValueKeyDown: Shift key is pressed");
			return;
		}
		if (e.key === "Backspace") {
			props.onValueChange(props.x, props.y, 0);
		} else if (e.key.match(/[1-9]/) && currentMode === "INSERT") {
			let inputValue: number = parseInt(e.key.slice(0, 1));
			props.onValueChange(props.x, props.y, inputValue);
		}
	};

	const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
		let isMultiSelect = false;
		if (e.shiftKey) {
			console.log("Shift key is pressed");
			isMultiSelect = true;
		}
		props.onClick(props.x, props.y, isMultiSelect);
	};

	const borderStyle: string = `border
		${
			(props.x + 1) % 3 === 0 &&
			props.x !== 8 &&
			!props.isSelected &&
			"border-b-2 border-gray-700"
		}
		${
			(props.y + 1) % 3 === 0 &&
			props.y !== 8 &&
			!props.isSelected &&
			"border-r-2 border-gray-700"
		}
		${
			props.isSelected
				? "border-2 border-blue-700 bg-blue-100"
				: "border-1 border-gray-700"
		}
		${props.isConflict && "bg-red-200"}`;

	const renderMarks = (allowEdit: boolean) => {
		return (
			<div
				tabIndex={allowEdit ? 0 : -1}
				className={`flex h-full w-full justify-center aspect-square 
                    p-0 text-sm lg:text-md text-center
                    row-start-${props.x + 1} col-start-${
						props.y + 1
					} ${borderStyle}`}
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
		// dynamically configure cell text color and background color
		let textColor: string = "text-black";
		if (props.isConflict) {
			textColor = "text-red-500";
		} else if (!props.isEditable) {
			textColor = "text-blue-900";
		}

		if (props.isEditable) {
			// set tabIndex to 0 to enable keyboard input
			return (
				<div
					tabIndex={0}
					className={`h-full w-full flex items-center justify-center aspect-square
				        p-0 text-2xl lg:text-5xl select-none min-h-32 min-w-32
				        row-start-${props.x + 1} col-start-${props.y + 1}
						caret-transparent ${textColor} ${borderStyle}`}
					onKeyDown={handleOnValueKeyDown}
					onClick={handleOnClick}>
					{props.value === 0 ? "" : props.value}
				</div>
			);
		} else {
			return (
				<div
					className={`h-full w-full flex items-center justify-center aspect-square
				        p-0 text-2xl lg:text-5xl select-none min-h-32 min-w-32
				        row-start-${props.x + 1} col-start-${props.y + 1}
						caret-transparent ${textColor} ${borderStyle}`}
					onKeyDown={handleOnValueKeyDown}
					onClick={handleOnClick}>
					{props.value === 0 ? "" : props.value}
				</div>
			);
		}
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
