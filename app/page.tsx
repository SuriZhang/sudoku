"use client";

import React from "react";
import Game from "./pages/game";

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold">Sudoku Game</h1>

			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<Game />
			</div>
			<button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
				show answer
			</button>
		</main>
	);
}
