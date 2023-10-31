"use client";

import React from "react";
import Game from "./pages/game";

export default async function Home() {
	return (
		<main className="flex flex-col items-center justify-between p-24 h-screen">
			<h1 className="font-bold text-xl font-mono">Sudoku Game</h1>
			<div className="z-10 w-2/3 max-h-screen items-center justify-between font-mono text-sm lg:flex lg:w-1/2">
				<Game />
			</div>
		</main>
	);
}
