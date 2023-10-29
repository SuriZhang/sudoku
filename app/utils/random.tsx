export function getRandomNumberString(): string {
	const numberArray = [
		".",
		".",
		".",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];
	const randomIndex = Math.floor(Math.random() * numberArray.length);
	return numberArray[randomIndex];
}

export function getRandomNumber(): number {
	const numberArray = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const randomIndex = Math.floor(Math.random() * numberArray.length);
	return numberArray[randomIndex];
}

export function getRandomIndex(n: number): number {
	const randomIndex = Math.floor(Math.random() * n);
	return randomIndex;
}
