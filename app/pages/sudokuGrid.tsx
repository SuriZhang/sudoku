"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cell } from "./cell";
import { useCalculateGridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "../utils/modeContext";
import { getPuzzles } from "../utils/puzzleLoader";
import { Loading } from "./loading";

export const SudokuGrid = (props: { currentMode: string }) => {
	const { init, onCellValueChange, onCellClick, puzzleGrid, setPuzzleGrid , clearSelectedCells } =
		useCalculateGridInfo();

	const [puzzles, setPuzzles] = useState<string[]>([]);
	const [puzzleIndex, setPuzzleIndex] = useState<number>(0);

	const isLoading = puzzles.length === 0;
	// to handle outside div click
	const ref = useRef<HTMLDivElement>(null);

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
		init(puzzles[puzzleIndex]);
		console.log(`sudokuGrid.currentPuzzle = ${puzzles[puzzleIndex]}`);
	}, [puzzles, puzzleIndex]);

	const handlePuzzleChange = () => {
		if (puzzleIndex < puzzles.length - 1) {
			setPuzzleIndex(puzzleIndex + 1);
		} else {
			setPuzzleIndex(0);
		}
	};

	useEffect(() => {
		const handleOutSideClick = (event: MouseEvent) => {
			if (ref.current && !ref.current?.contains(event.target as Node)) {
				console.log("outside click");
				// TODO: clear all selected cells and highlights
			}
		};

		window.addEventListener("mousedown", handleOutSideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [ref]);

	return (
		<>
			<div className="grid bg-gray-100 grid-rows-9 grid-cols-9 gap-0 p-0" ref={ref}>
				<ModeContext.Provider value={props.currentMode}>
					{isLoading ? (
						<Loading />
					) : (
						puzzleGrid.flatMap((row) =>
							row.map((cell) => {
								return (
									<Cell
										key={`${cell.x}*9+${cell.y}`}
										{...cell}
										onValueChange={onCellValueChange}
										onClick={onCellClick}
									/>
								);
							})
						)
					)}
				</ModeContext.Provider>
			</div>
			<div className="p-5">
				<button
					className={`mr-2 bg-blue-500
					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
					onClick={() => handlePuzzleChange()}>
					next puzzle
				</button>
			</div>
		</>
	);
};
