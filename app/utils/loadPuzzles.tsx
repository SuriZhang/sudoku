import supabase from "./supabase";

export async function getPuzzles(): Promise<string[]> {
	let { data: puzzles, error } = await supabase
		.from("sudoku_puzzles")
		.select("puzzle");

	if (error) {
		throw new Error(error.message);
	}
	return puzzles?.map((puzzle) => puzzle.puzzle) ?? [];
}


