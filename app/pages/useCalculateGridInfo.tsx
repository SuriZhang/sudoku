"use client";

import { useState } from "react";

export interface GridInfo {
	// cell information that need to share with other cells in here
	x: number;
	y: number;
	value: number;
	isConflict: boolean;
	// isHighlighted: boolean;
	isSelected?: boolean;
	isEditable?: boolean;
}

type SelectedCellInfo = [number, number];

export const useCalculateGridInfo = () => {
	const [puzzleGrid, setPuzzleGrid] = useState<GridInfo[][]>([]);
	// const [selectedCells, setSelectedCells] = useState<SelectedCellInfo[]>([]);

	// simply fills the new cell value in the grid
	const fillCellValue = (
		x: number,
		y: number,
		newValue: number
	): GridInfo[][] => {
		const updatedGrid = puzzleGrid.map((row, rowIndex) => {
			if (rowIndex === x) {
				row.map((cell, colIndex) => {
					if (colIndex === y) {
						cell.value = newValue;
					}
					return cell;
				});
			}
			return row;
		});
		return updatedGrid;
	};

	// clear all conflicts
	const clearConflicts = (grid: GridInfo[][]): GridInfo[][] => {
		const updatedGrid = grid.map((row, rowIndex) => {
			row.map((cell, colIndex) => {
				cell.isConflict = false;
				return cell;
			});
			return row;
		});
		return updatedGrid;
	};

	// validate the attempted value and update the cell, mark all conflicts
	const validateAndUpdateCell = (
		x: number,
		y: number,
		newValue: number
	): GridInfo[][] => {
		const updatedGrid = fillCellValue(x, y, newValue);

		let hasConflict: boolean = false;
		// Check for conflicts in row
		const row: GridInfo[] = updatedGrid[x];
		row.map((cell) => {
			if (cell.value === newValue && cell.y !== y) {
				updatedGrid[cell.x][cell.y].isConflict = true;
				hasConflict = true;
			}
		});

		// Check for conflicts in column
		const col: GridInfo[] = updatedGrid.map((row) => row[y]);
		col.map((cell) => {
			if (cell.value === newValue && cell.x !== x) {
				updatedGrid[cell.x][cell.y].isConflict = true;
				hasConflict = true;
			}
		});

		// Check for conflicts in box
		const boxValues: GridInfo[] = getBoxValues(updatedGrid, x, y);
		boxValues.map((cell) => {
			if (cell.value === newValue && (cell.x !== x || cell.y !== y)) {
				updatedGrid[cell.x][cell.y].isConflict = true;
				hasConflict = true;
			}
		});

		if (hasConflict) {
			updatedGrid[x][y].isConflict = true;
		}

		return updatedGrid;
	};

	const getBoxValues = (grid: GridInfo[][], x: number, y: number) => {
		const boxStartX = Math.floor(x / 3) * 3;
		const boxStartY = Math.floor(y / 3) * 3;
		const boxValues: GridInfo[] = [];
		for (let i = boxStartX; i < boxStartX + 3; i++) {
			for (let j = boxStartY; j < boxStartY + 3; j++) {
				boxValues.push(grid[i][j]);
			}
		}
		return boxValues;
	};

	const onCellValueChange = (x: number, y: number, newValue: number) => {
		let updatedGrid: GridInfo[][] = [];

		if (
			Number.isNaN(newValue) ||
			newValue === 0 ||
			puzzleGrid[x][y].value === newValue
		) {
			// if user enters backspace or the same value again, remove the cell value
			// and clear all conflicts
			updatedGrid = clearConflicts(fillCellValue(x, y, 0));
		} else {
			updatedGrid = clearConflicts(puzzleGrid);
			updatedGrid = validateAndUpdateCell(x, y, newValue);
		}

		setPuzzleGrid(updatedGrid);
	};

	// clear all highlights
	const clearHighlights = (grid: GridInfo[][]): GridInfo[][] => {
		const updatedGrid = grid.map((row, rowIndex) => {
			row.map((cell, colIndex) => {
				// cell.isHighlighted = false;
				return cell;
			});
			return row;
		});
		return updatedGrid;
	};

	const clearSelectedCells = (grid: GridInfo[][]) => {
		// clear all selected cells
		let updatedGrid = clearHighlights(grid);
		updatedGrid = grid.map((row) => {
			row.map((cell) => {
				cell.isSelected = false;
				return cell;
			});
			return row;
		});
		
		setPuzzleGrid(updatedGrid);
	}

	const onCellClick = (x: number, y: number) => {
		// only hightlight the last selected cell
		let updatedGrid = clearHighlights(puzzleGrid);
		updatedGrid = puzzleGrid.map((row, rowIndex) => {
			if (rowIndex == x) {
				row.map((cell, colIndex) => {
					if (colIndex == y) {
						// double click cancels the selection
						// cell.isHighlighted = !cell.isHighlighted;
						cell.isSelected = !cell.isSelected;
					}
					return cell;
				});
			}
			return row;
		});
		setPuzzleGrid(updatedGrid);
	};

	const init = (puzzle: string) => {
		console.log(`init.puzzle = ${puzzle}`);
		if (puzzle === "") {
			console.log("puzzle is empty");
		}

		let gridInfo: GridInfo[][] = [];
		if (puzzle !== "" && puzzle !== undefined) {
			for (let r: number = 0; r < 9; r++) {
				gridInfo[r] = [];
				for (let c = 0; c < 9; c++) {
					let initValue: string | number = puzzle.charAt(r * 9 + c);
					if (initValue === ".") {
						initValue = 0;
					}
					gridInfo[r][c] = {
						x: r,
						y: c,
						isEditable: initValue === 0,
						value: Number(initValue),
						isConflict: false,
						// isHighlighted: false,
						isSelected: false,
					};
				}
			}
		}
		setPuzzleGrid(gridInfo);
	};

	return {
		onCellValueChange,
		onCellClick,
		puzzleGrid,
		setPuzzleGrid,
		// selectedCells,
		clearSelectedCells,
		init,
	};
};
