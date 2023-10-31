"use client";

import React, { useEffect, useRef, useState } from "react";
import { Cell } from "./cell";
import { GridInfo, useCalculateGridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "../utils/modeContext";
import { getPuzzles } from "../utils/puzzleLoader";
import { Loading } from "./loadingAnimation";

export const SudokuGrid = (props: { currentMode: string }) => {
	const {
		init,
		onCellValueChange,
		onCellClick,
		puzzleGrid,
		clearSelectedCells,
	} = useCalculateGridInfo();

	const [puzzles, setPuzzles] = useState<string[]>([]);
	const [puzzleIndex, setPuzzleIndex] = useState<number>(0);

	// to keep track of previous puzzleGrid, used to clear selected cells
	const previousPuzzleGridRef = useRef<GridInfo[][]>(puzzleGrid);
	// to handle outside div click
	const outerDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Update the previousPuzzleGrid when puzzleGrid changes
		previousPuzzleGridRef.current = puzzleGrid;
	}, [puzzleGrid]);

	const isLoading = puzzles.length === 0;

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
	}, []);

	useEffect(() => {
		init(puzzles[puzzleIndex]);
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
			if (
				outerDivRef.current &&
				!outerDivRef.current?.contains(event.target as Node)
			) {
				// clear all selected cells and highlights
				clearSelectedCells(previousPuzzleGridRef.current);
			}
		};

		window.addEventListener("mousedown", handleOutSideClick);

		return () => {
			window.removeEventListener("mousedown", handleOutSideClick);
		};
	}, [outerDivRef]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div
						className={`grid ${ !isLoading && "bg-white"} grid-rows-9 grid-cols-9 gap-0 p-0 apsect-square`}
						ref={outerDivRef}>
						<ModeContext.Provider value={props.currentMode}>
							{puzzleGrid.flatMap((row) =>
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
							)}
						</ModeContext.Provider>
					</div>

					<div className="p-5">
						<button
							className={`mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
							onClick={() => handlePuzzleChange()}>
							next puzzle
						</button>
					</div>
				</>
			)}
		</>
	);
};
