"use client";

import React, { useState } from "react";
import { Mark } from "./mark";
import { GridInfo } from "./useCalculateGridInfo";

interface CellProps extends GridInfo {
    currentMode: string;
	onClick: (x: number, y: number) => void;
	onValueChange: (x: number, y: number, value: number) => void;
}

// information that is exclusive to current cell
export const Cell = (props: CellProps) => {
	// marks for cell
	const [markValues, setMarkValues] = useState<number[]>([]);

	const onMarkValueEnter = (value: number) => {
		// if the mark already exists, remove it
		if (markValues.includes(value)) {
			setMarkValues(markValues.filter((mark: number) => mark !== value));
			return;
		} else {
			// add mark to the cell
			setMarkValues([...markValues, value]);
		}
	};

	const handleOnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let inputValue: string | number = e.target.value;
        // validate if input is a number
		if (/^\d*$/.test(inputValue)) {
			inputValue = parseInt(inputValue.slice(0, 1));
			console.log(
				`inputValue = ${inputValue}, cellValue = ${props.value}`
            );

            switch (props.currentMode) {
                case "INSERT":
                    props.onValueChange(props.x, props.y, inputValue);
                    break;
                case "MARK":
                    break;
                case "SELECT":
                    break;
                default:
                    break;
            }
		}
	};

	const handleOnClick = () => {
		props.onClick(props.x, props.y);
	};


    // rendering cell
    if (markValues.length > 0) {
        return (
            <Mark markValues={markValues} onMarkValueEnter={onMarkValueEnter} />
        );
    } else {
        return (
            <input
                className={`flex h-full w-full justify-center font-bold aspect-square 
                border boarder-1 border-black p-0 text-2xl text-center
                row-start-${props.x + 1} col-start-${props.y + 1}
                ${(props.x + 1) % 3 === 0 &&
                    props.x !== 8 &&
                    "border-b-2 border-black"
                    }
                ${(props.y + 1) % 3 === 0 &&
                    props.y !== 8 &&
                    "border-r-2 border-black"
                    }
                ${props.isConflict ? "text-red-500" : "text-black"}
                ${props.isSelected && "bg-yellow-200"}
            `}
                value={props.value === 0 ? "" : props.value}
                onChange={handleOnValueChange}
                readOnly={false}
                onClick={handleOnClick}
            />
        );
    }
};
