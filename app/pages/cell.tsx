"use client";

import React, { useState } from "react";

function Marks(length: number) {
    const [mark, setMark] = useState<boolean[]>(new Array(length).fill(false));

    const getMark = (index: number) => {
        if (isValidMark(index)) {
            return mark[index];
        } else {
            throw new Error("Invalid mark");
        }
    };

    const updateMark = (index: number) => {
        if (isValidMark(index)) {
            // flip the value of the mark
            // e.g. if this cell is marked 1, update it again means remove this mark
            const value = !mark[index];
            const newMark = [...mark];
            newMark[index] = value;
            setMark(newMark);
        } else {
            throw new Error("Invalid mark");
        }
    };

    const isValidMark = (index: number) => {
        return index >= 0 && index < mark.length;
    };

    function renderMarks() {
        return mark.map((value, index) => {
            if (value) {
                return <span key={index}>{index + 1}</span>;
            } else {
                return null;
            }
        });
    }

    return { mark, getMark, updateMark, isValidMark, renderMarks };
}

export interface CellProps {
    value: number;
    xPos: number;
    yPos: number;
    isEditable?: boolean;
    isConflicted?: boolean;
    isHighlighted?:boolean
    boardSize: number;
    currentMode: string;
    onCellValueChange: (x: number, y: number, newValue: number) => boolean;
    onCellClick: (x: number, y: number) => void;
}

function Cell({
    value,
    xPos,
    yPos,
    isEditable,
    isConflicted = false,
    isHighlighted = false,
    boardSize,
    currentMode,
    onCellValueChange,
    onCellClick,
}: CellProps) {
    const [cellValue, setCellValue] = useState<number>(value);
    // const [cellConflicted, setCellConflicted] = useState<boolean>(isConflicted);
    // marks are the possible values for the cell
    const { mark, getMark, updateMark, isValidMark, renderMarks } = Marks(
        (length = boardSize),
    );

    // set the value of the cell
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditable) {
            let inputValue: string | number = e.target.value;
            // validate input is a number
            if (/^\d*$/.test(inputValue)) {
                inputValue = parseInt(inputValue.slice(0, 1));
                console.log(`inputValue = ${inputValue}, cellValue = ${cellValue}`)
                // notify SudokuGrid of the change
                if (
                    inputValue === cellValue || Number.isNaN(inputValue) ||
                    (e.nativeEvent as InputEvent).inputType === "deleteContentBackward"
                ) {
                    // re-enter the same value is equal to delete the value
                    inputValue = Number.NaN;
                }

                let valid: boolean = onCellValueChange(xPos, yPos, inputValue);
                if (valid) {
                    console.log(`isvalid = ${valid}`)
                    setCellValue(Number.isNaN(inputValue) ? 0 : inputValue);
                } else {
                    console.log(`Invalid input value ${inputValue}`);
                }
            }
            console.log(`inputValue = ${inputValue}, cellValueAfter = ${cellValue}`)
        }
    };

    // set the mark of the cell
    function addMark(newMark: number): void {
        if (!isEditable) return;
        if (isValidMark(newMark)) {
            updateMark(newMark);
        }
    }

    const onCellBlur = () => {
        // Save the input value when the input field loses focus
        if (isEditable) {
            setCellValue(cellValue);
        }
    };

    // select the cell
    const handleCellClick = () => {
        onCellClick(xPos, yPos)
        console.log(`selected cell value = ${cellValue}`)
        console.log(`selected cell xPos = ${xPos + 1}, yPos = ${yPos + 1}`)
    };

    function renderCell() {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center">
                <input className={`bg-grey-100 flex h-full w-full justify-center text-center font-bold 
                    ${isConflicted ? "text-red-500" : "text-black"} 
                    ${(xPos + 1) % 3 === 0 && xPos !== 8 && "border-b-2 border-black"}
                    ${(yPos + 1) % 3 === 0 && yPos !== 8 && "border-r-2 border-black"}
                    ${isHighlighted && "bg-yellow-200 border-2 border-yellow-500"}
                `}
                    value={cellValue === 0 ? "" : cellValue}
                    onChange={handleValueChange}
                    onBlur={onCellBlur}
                    readOnly={!isEditable}
                    onClick={handleCellClick}
                />

                {renderMarks()}
            </div>
        );
    }

    return (
        <div className="w-1/9 aspect-square border boarder-1 border-black p-0 text-2xl text-center">
            {renderCell()}
        </div>
    );
}

export default Cell;
