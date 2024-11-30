import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleError } from "@/lib/errorhandler";

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
		} = body;

		console.log("🚀 ~ POST ~ request.body", body);
		const date = new Date();

		const prompt = `
            Based on the following data: 
            - Age: ${currentAge}
            - Monthly Saving: ${monthlySaving}
            - Monthly Spending: ${monthlySpending}
            - Inflation Rate: ${inflationRate}%
            - Investment Rate: ${investmentRate}%
            - Date: ${date.toDateString()}

            Please provide a list of **recommended investment instruments and the names** in Indonesia with their **return rates** and **output estimates** in the following format:

            [
                { "instrument": "Government Bonds", "returnRate": "6-8%", "output": "Rp 215,000,000" },
                { "instrument": "Stocks", "returnRate": "8-12%", "output": "Rp 300,000,000" },
                { "instrument": "Mutual Funds", "returnRate": "5-10%", "output": "Rp 240,000,000" }
            ]

            Ensure that the response contains **no additional explanations** or commentary. Only output the list in the exact array format provided above.
            **Important**: The response must strictly follow this JSON format without any markdown or extra text.
        `;

		const result = await model.generateContent(prompt);

		return new Response(
			JSON.stringify({ recommendation: result.response.text() }),
			{
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (error) {
		console.error("Error generating recommendation:", error);
		return handleError(error);
	}
}
