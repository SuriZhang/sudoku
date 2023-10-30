export const Loading = () => {
	return (
		<>
			<div className="h-screen w-full flex justify-center items-center">
				<span className="animate-spin-slow relative flex h-10 w-10 rounded-sm bg-purple-400 opacity-75"></span>
				{/* <p>Loading Puzzles</p> */}
			</div>
			<div>Loading puzzles</div>
		</>
	);
};
