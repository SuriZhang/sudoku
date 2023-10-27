"use client";

import React, { useEffect, useState } from "react";
import { Cell } from "./cell";
import { useCalculateGridInfo } from "./useCalculateGridInfo";

export const SudokuGrid = (props: { currentMode: string }) => {
	const { init, onValueChange, onCellClick, gridInfo } =
		useCalculateGridInfo();
	// ensure init only run once
	useEffect(() => init(), []);
	return (
		<div className="grid bg-gray-100 grid-rows-9 grid-cols-9 gap-0">
			{gridInfo.flatMap((row) =>
				row.map((cell) => {
					return (
						<Cell
							key={`${cell.x}*9+${cell.y}`}
							{...cell}
							currentMode={props.currentMode}
							onValueChange={onValueChange}
							onClick={onCellClick}
						/>
					);
				})
			)}
		</div>
	);
};
