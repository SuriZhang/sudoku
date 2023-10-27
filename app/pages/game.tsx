"use client";

import React, { useState } from "react";
import { SudokuGrid } from "./sudokuGrid";

export default function Game() {
	const [currentMode, setCurrentMode] = useState<string>("INSERT");

	const handleModeChange = (mode: string) => {
		if (mode === "INSERT" || mode === "MARK" || mode === "SELECT") {
			setCurrentMode(mode);
			console.log(`currentMode = ${currentMode}`)
		}
	};

	return (
		<div>
			<div className="flex justify-center items-center">
				<SudokuGrid currentMode={currentMode} />
			</div>
			<div className="mb-8 mt-2 flex justify-center">
				<button
					className={`mr-2 
					${currentMode === "INSERT" ? "bg-blue-500" : "bg-blue-300"} 
					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
					onClick={() => handleModeChange("INSERT")}>
					Insert Mode (i)
				</button>
				<button
					className={`mr-2 
					${currentMode === "MARK" ? "bg-blue-500" : "bg-blue-300"} 
					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
					onClick={() => handleModeChange("MARK")}>
					Mark Mode (m)
				</button>
				<button
					className={`mr-2 
					${currentMode === "SELECT" ? "bg-blue-500" : "bg-blue-300"} 
					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
					onClick={() => handleModeChange("SELECT")}>
					Select Mode (s)
				</button>
			</div>
		</div>
	);
}


