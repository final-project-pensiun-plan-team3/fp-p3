import cron from "node-cron";
import nodemailer from "nodemailer";
import { reminderEmailTemplate } from "./emailTemplate";
// import { Db } from "mongodb";
// import { findInactiveUsers } from "./findInactiveUsers";

// punya brandon, aku comment buat backup
// export function startSavingsReminderCron() {
//   // Schedule the job to run every day at midnight
//   cron.schedule("0 0 * * *", async () => {
//     console.log("Running savings reminder cron job");

//     try {
//       // Find inactive users
//     //   const inactiveUsers = await findInactiveUsers(db);

//       // Iterate through inactive users and send reminders
//     //   for (const user of inactiveUsers) {
//     //     const email = await getUserEmail(db, user._id); // Implement this to get the user's email
//     //     if (email) {
//     //       await sendReminderEmail(email, user.lastCreatedAt);
//     //     }
//     //   }

//       console.log("Savings reminder cron job completed successfully");
//     } catch (error) {
//       console.error("Error running savings reminder cron job:", error);
//     }
//   });
// }

export function startReminderCron() {
  cron.schedule("0 9 * * *", async () => {
    console.log("Running daily reminder cron job");

    try {
      const users = [
        { email: "user1@example.com", name: "User1" },
        { email: "user2@example.com", name: "User2" },
      ];

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      for (const user of users) {
        const mailOptions = {
          from: `"Your App Name" <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: "Reminder to Update Your Savings",
          html: reminderEmailTemplate(user.name),
        };

        await transporter.sendMail(mailOptions);
        console.log(`Reminder email sent to ${user.email}`);
      }

      console.log("Daily reminder cron job completed successfully");
    } catch (error) {
      console.error("Error in daily reminder cron job:", error);
    }
  });
}
