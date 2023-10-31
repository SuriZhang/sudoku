import React from "react";
import { AiFillSmile } from "react-icons/ai";

type ProFeatureDialogProps = {
	isOpen: boolean;
	onClose: () => void;
};

export const ProFeatureDialog = ({
	isOpen,
	onClose,
}: ProFeatureDialogProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-yellow-50 bg-opacity-90 rounded-lg p-8 shadow-lg border border-gray-200">
				<h2 className="text-xl font-bold mb-4 font-mono text-gray-00">
					Woo you found a Pro Feature! <AiFillSmile />
				</h2>
				<p className="mb-4">
					<img
						className="object-scale-down h-48 w-96"
						alt="Cat holding up a sign looking for a job"
						src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7589/production/_99698003_catwork.jpg"
					></img>
					<p className="text-md text-gray-700">To unlock this feature, please extend an offer :) </p>
				</p>
				<button
					className="float float-right bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
					onClick={onClose}>
					YESSS!!! 
				</button>
			</div>
		</div>
	);
};
