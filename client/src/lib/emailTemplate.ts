export function reminderEmailTemplate(name: string): string {
	return `
		<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
			<div style="text-align: center;">
				<h2 style="color: #1e90ff;">Hello, ${name}!</h2>
				<p>We hope this message finds you well. 🌟</p>
				<p>
					This is a friendly reminder to review and update your savings for this month. 
					Staying on track with your financial goals is key to building a secure future!
				</p>
				<div style="padding: 15px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; max-width: 400px;">
					<p style="margin: 0; font-size: 18px;">💡 <strong>Tip of the Month:</strong> Consistent savings build long-term wealth.</p>
				</div>
				<p>
					Log in to your account now to update your savings status and keep making progress toward your goals.
				</p>
				<a 
					href="[Your App URL Here]" 
					style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #1e90ff; text-decoration: none; border-radius: 5px; margin-top: 20px;"
				>
					Update My Savings
				</a>
				<p style="margin-top: 20px; font-size: 14px; color: #555;">Thank you for choosing [Your App Name].</p>
			</div>
		</div>
	`;
}
