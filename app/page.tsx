"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Game from "./pages/game";

export default function Home() {
    const [boardSize, setBoardSize] = useState<number>(9);

    // Function to update the boardSize
    const updateBoardSize = (newSize: number) => {
        setBoardSize(newSize);
    };

    return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold">Sudoku Game</h1>

			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<Game />
				<button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
					show answer
				</button>
			</div>
		</main>
	);
}
