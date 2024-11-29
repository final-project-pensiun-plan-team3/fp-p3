import * as React from "react";

interface EmailTemplateProps {
	firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
}) => (
	<div>
		<h2>Hello, {firstName}!</h2>
		<p>We hope this message finds you well 🌟</p>
		<p>
			This is a friendly reminder to review and update your savings for this
			month. Staying on track with your financial goals is key to building a
			secure future!
		</p>
		<p>
			If you need any assistance with your savings plan, feel free to reach out
			to us. We are here to help!
		</p>
		<p>Best regards,</p>
		<p>PensiunPlan Team</p>
	</div>
);
