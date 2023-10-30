"use client";

import React, { useEffect, useState } from "react";
import { Cell } from "./cell";
import { useCalculateGridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "./modeContext";
import { getPuzzles } from "../utils/loadPuzzles";

export const SudokuGrid = (props: { currentMode: string }) => {
	const { init, onValueChange, onCellClick, puzzleGrid } =
		useCalculateGridInfo();

	const [puzzles, setPuzzles] = useState<string[]>([]);
	const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
	const [currentPuzzle, setCurrentPuzzle] = useState<string>("");

	// ensure that the puzzles are fetched before initializing the grid
	// only run once
	useEffect(() => {
		const fetchPuzzles = async () => {
			try {
				const fetchedPuzzles = await getPuzzles();
				setPuzzles(fetchedPuzzles);
			} catch (error) {
				console.error("Error fetching puzzles:", error);
			}
		};
		fetchPuzzles();
		console.log(`puzzles = ${puzzles}`);
	}, []);

	useEffect(() => {
		setCurrentPuzzle(puzzles[puzzleIndex]);
		init(puzzles[puzzleIndex]);
		console.log(`sudokuGrid.currentPuzzle = ${puzzles[puzzleIndex]}`);
	}, [puzzles, puzzleIndex]);

	const handlePuzzleChange = () => {
		if (puzzleIndex < puzzles.length - 1) {
			setPuzzleIndex(puzzleIndex + 1);
		} else {
			setPuzzleIndex(0);
		}
		setCurrentPuzzle(puzzles[puzzleIndex]);
	};

	return (
		<>
			<div className="grid bg-gray-100 grid-rows-9 grid-cols-9 gap-0 p-0">
				<ModeContext.Provider value={props.currentMode}>
					{puzzleGrid.flatMap((row) =>
						row.map((cell) => {
							return (
								<Cell
									key={`${cell.x}*9+${cell.y}`}
									{...cell}
									onValueChange={onValueChange}
									onClick={onCellClick}
								/>
							);
						})
					)}
				</ModeContext.Provider>
			</div>
			<button
				className={`mr-2 bg-blue-500
					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
				onClick={() => handlePuzzleChange()}>
				next puzzle
			</button>
		</>
	);
};
