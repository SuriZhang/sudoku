"use client";

import React, { useState } from "react";
import { SudokuGrid } from "./sudokuGrid";
import { ProFeatureDialog } from "./proFeatureDialog";
import { PiPencilBold, PiPencilSlashBold, PiLightbulbFilamentBold } from "react-icons/pi";

export default function Game() {
	const [currentMode, setCurrentMode] = useState<string>("INSERT");

	const handleModeChange = (mode: string) => {
		if (mode === "INSERT" || mode === "MARK") {
			setCurrentMode(mode);
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
						className={`w-40 ${
							currentMode === "INSERT"
								? "bg-blue-500"
								: "bg-blue-300"
						} 
      					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
						onClick={() => handleModeChange("INSERT")}>
						<PiPencilBold />
						Insert Mode
					</button>
					<button
						className={`w-40 ${
							currentMode === "MARK"
								? "bg-blue-500"
								: "bg-blue-300"
						} 
     					hover:bg-blue-700 text-white font-bold py-2 px-6 rounded`}
						onClick={() => handleModeChange("MARK")}>
						<PiPencilSlashBold />
						Mark Mode
					</button>
					<div>
						<button
							className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
							onClick={openDialog}>
							<PiLightbulbFilamentBold />
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


