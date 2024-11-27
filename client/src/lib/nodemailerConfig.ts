import { google } from "googleapis";
import nodemailer from "nodemailer";

const OAuth2 = google.auth.OAuth2;

// Konfigurasi OAuth2
const oauth2Client = new OAuth2(
	process.env.GMAIL_CLIENT_ID, 
	process.env.GMAIL_CLIENT_SECRET, 
	process.env.REDIRECT_URL 
);

oauth2Client.setCredentials({
	refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const getAccessToken = async (): Promise<string> => {
	try {
		const response = await oauth2Client.getAccessToken();
        console.log(response);
        
		const token = response.token;

		if (!token) {
			throw new Error("Failed to retrieve access token");
		}

		return token;
	} catch (error) {
		console.error("Error getting access token:", error);
		throw new Error("Error getting access token");
	}
};

const createTransporter = async () => {
	const accessToken = await getAccessToken();

	return nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.GMAIL_USER,
			clientId: process.env.GMAIL_CLIENT_ID,
			clientSecret: process.env.GMAIL_CLIENT_SECRET,
			refreshToken: process.env.GMAIL_REFRESH_TOKEN,
			accessToken: accessToken,
		},
	});
};

export { createTransporter };
