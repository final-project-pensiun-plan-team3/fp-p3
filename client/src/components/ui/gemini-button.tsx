import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useRef, useState } from "react";
import Image from "next/image";

const MySwal = withReactContent(Swal);

type AIRecommendationButtonProps = {
	data: {
		currentAge: number;
		monthlySaving: number;
		monthlySpending: number;
		inflationRate: number;
		investationRate: number;
	};
};

export default function AIRecommendationButton({
	data,
}: AIRecommendationButtonProps) {
	const buttonRef = useRef<HTMLDivElement>(null);
	const [isHovering, setIsHovering] = useState(false);

	let isDragging = false;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging = true;
		const button = buttonRef.current;

		if (button) {
			const offsetX = e.clientX - button.offsetLeft;
			const offsetY = e.clientY - button.offsetTop;

			const handleMouseMove = (e: MouseEvent) => {
				if (isDragging) {
					button.style.left = `${e.clientX - offsetX}px`;
					button.style.top = `${e.clientY - offsetY}px`;
				}
			};

			const handleMouseUp = () => {
				isDragging = false;
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}
	};

	const handleGetAIRecommendation = async () => {
		try {
			const {
				currentAge,
				monthlySaving,
				monthlySpending,
				inflationRate,
				investationRate,
			} = data;

			const body = {
				currentAge,
				monthlySaving,
				monthlySpending,
				inflationRate,
				investmentRate: investationRate,
			};

			const response = await axios.post("/apis/recommendation", body);

			if (response.data && Array.isArray(response.data)) {
				const formattedRecommendation = response.data
					.map(
						(item: {
							instrument: string;
							returnRate: string;
							output: string;
						}) => {
							return `
                            <li>
                                <strong>${item.instrument}</strong><br>
                                <p>Return Rate: ${item.returnRate}</p>
                                <p>Estimated Output: ${item.output}</p><br>
                            </li>
                        `;
						}
					)
					.join("");

				MySwal.fire({
					title: "AI Recommendation",
					html: `<ul>${formattedRecommendation}</ul>`,
					icon: "info",
					width: 800,
					confirmButtonText: "Close",
				});
			} else {
				throw new Error("Recommendation data not found or malformed");
			}
		} catch (error) {
			console.error("Error fetching AI recommendation:", error);
			MySwal.fire({
				title: "Error",
				text:
					(error as Error).message ||
					"Failed to fetch AI recommendation. Please try again.",
				icon: "error",
				confirmButtonText: "Close",
			});
		}
	};

	return (
		//button floating, kalo pake ini taruh di dashboard line 239/240
		<div
			ref={buttonRef}
			onMouseDown={handleMouseDown}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className="fixed bottom-4 right-4 w-14 h-14 bg-gray-800 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-move select-none">
			<button
				onClick={handleGetAIRecommendation}
				className="flex items-center justify-center">
				<Image src="/images/PensiunPlan.png" alt="AI" width={54} height={54} />
			</button>
			{/* Tooltip */}
			{isHovering && (
				<div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-md text-center">
					Get AI Recommendation
				</div>
			)}
		</div>
		// button biasa, kalo aktifin ini taruh di dashboard line 186
		// <button
		//     onClick={handleGetAIRecommendation}
		//     className="shadow-[0_0_0_3px_#000000_inset] px-4 py-1 bg-transparent border border-black text-black text-sm rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
		//     Get AI Recommendation
		// </button>
	);
}
