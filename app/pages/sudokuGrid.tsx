"use client";

import React, { useState } from "react";
import Cell from "./cell";
import { getRandomNumber } from "../utils/random";

function SudokuGrid({ boardSize = 9, currentMode = "INSERT"}) {
    const grid: JSX.Element[][] = [];
    const [selectedCells, setSelectedCells] = useState<number[]>([]);
    const [canSelect, setCanSelect] = useState<boolean>(false);
    // Track the highlighted cell
    const [highlightedCell, setHighlightedCell] = useState<string | null>(null); 

    const handleCellClick = (x: number, y: number) => {
		if (highlightedCell === `${x}*${boardSize}+${y}`) {
			// Un-highlight the cell if it's already-- highlighted
			setHighlightedCell(null);
		} else {
			// Highlight the clicked cell
			setHighlightedCell(`${x}*${boardSize}+${y}`);
		}
	};

	// callback function to handle cell value change
	const handleCellValueChange = (
		x: number,
		y: number,
		newValue: number
	): boolean => {
		if (Number.isNaN(newValue)) {
			grid[x][y] = (
				<Cell
					key={`${x}*${boardSize}+${y}`}
					value={0}
					xPos={x}
					yPos={y}
					isEditable={true}
                    boardSize={boardSize}
                    currentMode={currentMode}
					onCellValueChange={handleCellValueChange}
					onCellClick={handleCellClick}
				/>
			);
			return true;
		}

		if (!validateRow(x, y, newValue)) {
			return false;
		} else if (!validateColumn(x, y, newValue)) {
			return false;
		} else if (!validateSubgrid(x, y, newValue)) {
			return false;
		} else {
			// if the new value is valid, update the value of the cell
			grid[x][y] = (
				<Cell
					key={`${x}*${boardSize}+${y}`}
					value={newValue}
					xPos={x}
					yPos={y}
					isEditable={true}
                    boardSize={boardSize}
                    currentMode={currentMode}
					onCellValueChange={handleCellValueChange}
					onCellClick={handleCellClick}
				/>
			);
			return true;
		}
	};    

    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const key = `${x}*${boardSize}+${y}`;
            const initValue = getRandomNumber();

            const cellComponent = (
                <Cell
                    key={key}
                    value={initValue}
                    xPos={x}
                    yPos={y}
                    isEditable={initValue === 0}
                    isHighlighted={key === highlightedCell}
                    boardSize={boardSize}
                    currentMode={currentMode}
                    onCellValueChange={handleCellValueChange}
                    onCellClick={handleCellClick}
                />
            );

            row.push(cellComponent);
        }
        grid.push(row);
    }

    return (
        <div className="container float top-30 left-30 w-96 h-96 ">
            {renderGridRows()}
        </div>
    );

    function renderGridRows() {
        return grid.map((row, index) => (
			<div
				key={index}
				className="grid bg-gray-100 grid grid-rows-9 grid-cols-9 gap-2w">
				{row}
			</div>
		));
    }

    function getCellValue(x: number, y: number): number {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (grid[row][col].key === `${x}*${boardSize}+${y}`) {
                    // Access the value of the Cell at position [x, y]
                    const value = grid[row][col].props.value;
                    console.log( `${grid[row][col].props}`)
                    return value;
                }
            }
        }
        // Handle the case where the Cell was not found
        return -1;
    }

    // validate row of specified cell of grid
    function validateRow(x: number, y: number, currentValue: number): boolean {
        for (let i = 0; i < boardSize; i++) {
            let value = getCellValue(x, i);
            console.log(`validate row, value = ${getCellValue(x, y)}`)
            if (value === 0 || Number.isNaN(value)) continue;
            if (value === currentValue && i !== y) {
                grid[x][i] = (
                    <Cell
                        key={`${x}*${boardSize}+${i}`}
                        value={value}
                        xPos={x}
                        yPos={i}
                        isEditable={true}
                        isConflicted={true}
                        boardSize={boardSize}
                        currentMode={currentMode}
                        onCellValueChange={handleCellValueChange}
                        onCellClick={handleCellClick}
                    />
                );

                console.log(`Conflict numbers in col ${i + 1}, cellValue: ${value}`);
                return false;
            }
        }
        return true;
    }

    // validate column of specified cell of grid
    function validateColumn(x: number, y: number, currentValue: number): boolean {
        for (let i = 0; i < boardSize; i++) {
            let value = getCellValue(i, y);
            console.log(`validate col, value = ${getCellValue(x, y)}`)
            if (value === 0) continue;
            if (value === currentValue && i !== x) {
                grid[i][y] = (
                    <Cell
                        key={`${x}*${boardSize}+${y}`}
                        value={value}
                        xPos={i}
                        yPos={y}
                        isEditable={true}
                        isConflicted={true}
                        boardSize={boardSize}
                        currentMode={currentMode}
                        onCellValueChange={handleCellValueChange}
                        onCellClick={handleCellClick}
                    />
                );

                console.log(`Conflict numbers in row ${i + 1}, cellValue: ${value}`);
                return false;
            }
        }
        return true;
    }

    // valid subgrid of specified cell of grid
    function validateSubgrid(x: number, y: number, currentValue: number): boolean {
        let subgridSize = Math.sqrt(boardSize);
        let subgridX = Math.floor(x / subgridSize);
        let subgridY = Math.floor(y / subgridSize);
        console.log(`validate subgrid`)
        for (
            let i = subgridX * subgridSize;
            i < subgridX * subgridSize + subgridSize;
            i++
        ) {
            for (
                let j = subgridY * subgridSize;
                j < subgridY * subgridSize + subgridSize;
                j++
            ) {
                let value = getCellValue(i, j);
                if (value === 0) continue;
                if (value === currentValue && i !== x && j !== y) {
                    grid[i][j] = (
                        <Cell
                            key={`${i}*${boardSize}+${j}`}
                            value={value}
                            xPos={i}
                            yPos={j}
                            isEditable={true}
                            isConflicted={true}
                            boardSize={boardSize}
                            currentMode={currentMode}
                            onCellValueChange={handleCellValueChange}
                            onCellClick={handleCellClick}
                        />
                    );
                    alert(`Conflict numbers in subgrid, cellValue: ${value}`);
                    return false;
                }
            }
        }
        return true;
    }
}

export default SudokuGrid;
