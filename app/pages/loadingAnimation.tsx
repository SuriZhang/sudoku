export const Loading = () => {
	return (
		<div className=" justify-center items-center text-center mt-100 text-gray-500 text-xl">
			<strong>Loading Puzzles...</strong>
			<div
				className="ml-auto inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status">
			</div>
		</div>
	);
};
