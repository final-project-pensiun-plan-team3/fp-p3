import * as React from "react";

interface EmailTemplateProps {
	firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
}) => (
	<table
		role="presentation"
		style={{
			borderCollapse: "collapse",
			tableLayout: "fixed",
			width: "100%",
			backgroundColor: "#e7e7e7",
			margin: "0 auto",
			padding: "0",
		}}
		cellPadding="0"
		cellSpacing="0">
		<tbody>
			<tr>
				<td align="center" style={{ verticalAlign: "top" }}>
					<table
						role="presentation"
						style={{
							maxWidth: "600px",
							width: "100%",
							backgroundColor: "#ffffff",
							margin: "0 auto",
							borderCollapse: "collapse",
						}}
						cellPadding="0"
						cellSpacing="0">
						<tbody>
							{/* Header */}
							<tr>
								<td
									align="center"
									style={{
										padding: "20px 0",
										backgroundColor: "#f4f4f4",
									}}>
									<img
										src="https://res.cloudinary.com/dhb9rc1xw/image/upload/v1733157866/PensiunPlan_ghjt6n.png"
										alt="PensiunPlan Logo"
										style={{
											display: "block",
											maxWidth: "150px",
											height: "auto",
										}}
									/>
								</td>
							</tr>

							{/* Main Content */}
							<tr>
								<td
									style={{
										padding: "20px",
										fontFamily: "Arial, sans-serif",
										fontSize: "16px",
										color: "#0d0d24",
										lineHeight: "1.5",
										textAlign: "center",
									}}>
									<h1
										style={{
											textAlign: "center",
											fontSize: "24px",
											color: "#24244d",
											margin: "0 0 20px",
										}}>
										Reminder to Update Your Savings Plan
									</h1>
									<p>Hi {firstName},</p>
									<p>
										This is a friendly reminder to review and update your
										savings for this month. Staying on track with your financial
										goals is key to building a secure future!
									</p>
									<div
										style={{
											textAlign: "center",
											marginTop: "30px",
											marginBottom: "30px",
										}}>
										<a
											href={process.env.NEXT_PUBLIC_BASE_URL}
											style={{
												display: "inline-block",
												padding: "12px 24px",
												backgroundColor: "#0d0d24",
												color: "#ffffff",
												textDecoration: "none",
												borderRadius: "4px",
												fontSize: "16px",
											}}>
											Update Your Savings
										</a>
									</div>
								</td>
							</tr>

							{/* Footer */}
							<tr>
								<td
									style={{
										fontFamily: "Arial, sans-serif",
										fontSize: "14px",
										color: "#666666",
										textAlign: "center",
										lineHeight: "1.5",
									}}>
									<p>
										Best regards, <br />
										PensiunPlan Team
									</p>
									<p style={{ marginTop: "10px" }}>
										If you need any assistance, feel free to reach out via{" "}
										<a
											href="mailto:pensiunplan@gmail.com"
											style={{ color: "#0073e6", textDecoration: "none" }}>
											email
										</a>
										. We are here to help!
									</p>
									<p style={{ marginTop: "20px" }}>
										© {new Date().getFullYear()} PensiunPlan. All rights
										reserved.
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
);
