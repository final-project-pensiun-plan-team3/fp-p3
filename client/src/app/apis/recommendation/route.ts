import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleError } from "@/lib/errorhandler";
// import { param } from "framer-motion/client";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {
			currentAge,
			monthlySaving,
			monthlySpending,
			inflationRate,
			investmentRate,
			totalSaving,
		} = body;
	

		// console.log("🚀 ~ POST ~ request.body", body);
		// console.log(param, "param");
		const date = new Date();

		const prompt = `
		Based on the following data: 
		- Age: ${currentAge}
		- Monthly Saving: Rp ${monthlySaving.toLocaleString('id-ID')}
		- Monthly Spending: Rp ${monthlySpending.toLocaleString('id-ID')}
		- Inflation Rate: ${inflationRate}%
		- Investment Rate: ${investmentRate}%
		- Total Saving: Rp ${totalSaving.toLocaleString('id-ID')}
		- Date: ${date.toDateString()}
	
		Please provide a list of **recommended investment instruments and the names** in Indonesia with their **return rates** and **output estimates based on total saving** in the following format:
	
		[
			{ "instrument": "Government Bonds", "returnRate": "%", "output": "Rp ${(totalSaving * (1 + 6 / 100)).toLocaleString('id-ID')}" },
			{ "instrument": "Stocks", "returnRate": "%", "output": "Rp ${(totalSaving * (1 + 8 / 100)).toLocaleString('id-ID')}" },
			{ "instrument": "Mutual Funds", "returnRate": "%", "output": "Rp ${(totalSaving * (1 + 7 / 100)).toLocaleString('id-ID')}" }
		]
	
		Ensure that the response contains **no additional explanations** or commentary. Only output the list in the exact array format provided above.
		**Important**: The response must strictly follow this format without any markdown or extra text.
	`;
	

		const result = await model.generateContent(prompt);

		const cleanedRecommendation = result.response
			.text()
			.replace(/```json\n|\n```/g, "");

		return new Response(cleanedRecommendation, {
			headers: { "Content-Type": "text/plain" },
		});
	} catch (error) {
		console.error("Error generating recommendation:", error);
		return handleError(error);
	}
}
