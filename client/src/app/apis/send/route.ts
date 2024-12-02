import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:NextRequest) {
	const { email, username } = await request.json();
	console.log("🚀 ~ POST ~ email:", email)
	try {
		const data = await resend.emails.send({
      from: "PensiunPlan <pensiunplan@alifnaufaldo.online>",
      to: [email],
      subject: "Reminder to Update Your Savings Plan",
      react: EmailTemplate({ firstName: username }),
    });

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

