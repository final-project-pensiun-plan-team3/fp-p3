import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		const data = await resend.emails.send({
			from: "PensiunPlan <pensiunplan@alifnaufaldo.online>",
			to: ["pensiunplan@gmail.com"],
			subject: "Reminder to Update Your Savings Plan",
			react: EmailTemplate({ firstName: "Team 3" }),
		});

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
