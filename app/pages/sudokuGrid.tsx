"use client";

import React, { useEffect, useState } from "react";
import { Cell } from "./cell";
import { useCalculateGridInfo } from "./useCalculateGridInfo";
import { ModeContext } from "./modeContext";

export const SudokuGrid = (props: { currentMode: string }) => {
	const { init, onValueChange, onCellClick, puzzleGrid } =
		useCalculateGridInfo();
	// ensure init only run once
	useEffect(() => init(), []);
	return (
		<div className="grid bg-gray-100 grid-rows-9 grid-cols-9 gap-0 p-0">
			{puzzleGrid.flatMap((row) =>
				row.map((cell) => {
                    return (
						<ModeContext.Provider value={props.currentMode}>
							<Cell
								key={`${cell.x}*9+${cell.y}+1`}
								{...cell}
								// currentMode={props.currentMode}
								onValueChange={onValueChange}
								onClick={onCellClick}
							/>
						</ModeContext.Provider>
					);
				})
			)}
		</div>
	);
};
