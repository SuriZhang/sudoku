"use client";

import React, { useState } from "react";
import { SudokuGrid } from "./sudokuGrid";
import { ProFeatureDialog } from "./proFeatureDialog";


export default function Game() {
	const [currentMode, setCurrentMode] = useState<string>("INSERT");

	const handleModeChange = (mode: string) => {
		if (mode === "INSERT" || mode === "MARK") {
			setCurrentMode(mode);
			console.log(`currentMode = ${currentMode}`);
		}
	};

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<>
			<div className="container flex-row mx-l mr-4 justify-center items-center aspect-square">
				<SudokuGrid currentMode={currentMode} />
			</div>
			<div className="flex flex-row space-x-4 sm:flex-row">
				<div className="mb-8 mt-2 flex flex-col items-center space-y-5">
					<button
						className={`w-32 ${
							currentMode === "INSERT"
								? "bg-blue-500"
								: "bg-blue-300"
						} 
      					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
						onClick={() => handleModeChange("INSERT")}>
						Insert Mode (i)
					</button>
					<button
						className={`w-32 ${
							currentMode === "MARK"
								? "bg-blue-500"
								: "bg-blue-300"
						} 
     					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
						onClick={() => handleModeChange("MARK")}>
						Mark Mode (m)
					</button>
					<div>
						<button
							className="w-32 bg-blue-500 text-white font-bold py-2 px-6 rounded"
							onClick={openDialog}>
							Show Answers
						</button>
						<ProFeatureDialog
							isOpen={isDialogOpen}
							onClose={closeDialog}
						/>
					</div>
				</div>
			</div>
		</>
	);
}


