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
			<div className="bg-white rounded-lg p-8 shadow-lg border border-grey-200">
				<h2 className="text-2xl font-bold mb-4">
					This is a Pro Feature
					<AiFillSmile />
				</h2>
				<p className="mb-4">
					<img
						className="object-scale-down h-48 w-96"
						alt="Cat holding up a sign looking for a job"
						src="https://ichef.bbci.co.uk/news/976/cpsprodpb/7589/production/_99698003_catwork.jpg"
						// width="976"
						// height="549"
						// loading="eager"
					></img>
					To unlock this feature, please extend an offer.
				</p>
				<button
					className="float float-right bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
					onClick={onClose}>
					YESSS!!!
				</button>
			</div>
		</div>
	);
};
