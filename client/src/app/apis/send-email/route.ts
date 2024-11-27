import { reminderEmailTemplate } from "@/lib/emailTemplate";
import { handleError } from "@/lib/errorhandler";
import { createTransporter } from "@/lib/nodemailerConfig";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, name } = await req.json();

		if (!email || !name) {
			return NextResponse.json(
				{ error: "Email and name are required" },
				{ status: 400 }
			);
		}

		const transporter = await createTransporter();

		const mailOptions = {
			from: `"Pensiun Plan" <${process.env.GMAIL_USER}>`,
			to: email,
			subject: "Reminder to Update Your Savings",
			html: reminderEmailTemplate(name),
		};

		await transporter.sendMail(mailOptions);

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.log("🚀 ~ POST ~ error:", error)		
		return handleError(error);
	}
}