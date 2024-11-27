import cron from "node-cron";
// import nodemailer from "nodemailer";
// import { Db } from "mongodb";
// import { findInactiveUsers } from "./findInactiveUsers";

export function startSavingsReminderCron() {
  // Schedule the job to run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    console.log("Running savings reminder cron job");

    try {
      // Find inactive users
    //   const inactiveUsers = await findInactiveUsers(db);

      // Iterate through inactive users and send reminders
    //   for (const user of inactiveUsers) {
    //     const email = await getUserEmail(db, user._id); // Implement this to get the user's email
    //     if (email) {
    //       await sendReminderEmail(email, user.lastCreatedAt);
    //     }
    //   }

      console.log("Savings reminder cron job completed successfully");
    } catch (error) {
      console.error("Error running savings reminder cron job:", error);
    }
  });
}
