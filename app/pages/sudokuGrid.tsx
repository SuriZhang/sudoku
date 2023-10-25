"use client";

import React from "react";
import Cell from "./cell";
import { getRandomNumber } from "../utils/random";

function SudokuGrid({ boardSize = 9 }) {
    const grid: JSX.Element[][] = [];
    let selectedCells: number[][] = [];

    // callback function to handle cell value change
    const handleCellValueChange = (
        x: number,
        y: number,
        newValue: number
    ): boolean => {
        if (Number.isNaN(newValue)) {
            grid[x][y] = (
                <Cell
                    key={`${x}-${y}`}
                    value={0}
                    xPos={x}
                    yPos={y}
                    isEditable={true}
                    boardSize={boardSize}
                    onCellValueChange={handleCellValueChange}
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
                    key={`${x}-${y}`}
                    value={newValue}
                    xPos={x}
                    yPos={y}
                    isEditable={true}
                    boardSize={boardSize}
                    onCellValueChange={handleCellValueChange}
                />
            );
            return true;
        }
    };

    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const key = `${x}-${y}`;
            const initValue = getRandomNumber();

            const cellComponent = (
                <Cell
                    key={key}
                    value={initValue}
                    xPos={x}
                    yPos={y}
                    isEditable={initValue === 0}
                    boardSize={boardSize}
                    onCellValueChange={handleCellValueChange}
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
                className="grid bg-gray-100 grid grid-rows-9 grid-cols-9 gap-2w hover:grid-rows-9"
            >
                {row}
            </div>
        ));
    }

    function getCellValue(x: number, y: number): number {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (grid[row][col].key === `${x}-${y}`) {
                    // Access the value of the Cell at position [x, y]
                    const value = grid[row][col].props.value;

                    return value;
                }
            }
        }
        // Handle the case where the Cell was not found
        return -1;
    }

    // select a cell, add it to selectedCells array
    function selectCell(x: number, y: number): void {
        selectedCells.push([x, y]);
    }

    // deselect a cell, remove it from selectedCells array
    function deselectCell(x: number, y: number): void {
        const index = selectedCells.indexOf([x, y]);

        if (index !== -1) {
            selectedCells.splice(index, 1);
        }
    }

    // validate row of specified cell of grid
    function validateRow(x: number, y: number, currentValue: number): boolean {
        for (let i = 0; i < boardSize; i++) {
            let value = getCellValue(x, i);
            console.log(`validate row, value = ${getCellValue(x, y)}`)
            if (value === 0 || Number.isNaN(value)) continue;
            if (value === currentValue && i !== y) {
                alert(`Conflict numbers in col ${i + 1}, cellValue: ${value}`);
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
                alert(`Conflict numbers in row ${i + 1}, cellValue: ${value}`);
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
                    alert(`Conflict numbers in subgrid, cellValue: ${value}`);
                    return false;
                }
            }
        }
        return true;
    }
}

export default SudokuGrid;
