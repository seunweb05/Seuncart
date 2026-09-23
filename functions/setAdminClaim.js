/**
 * Run this ONCE from a trusted/admin environment after deploying functions.
 * It grants admin:true only to the designated SEUNCART owner email.
 *
 * Never put Firebase Admin SDK credentials or service-account keys in React.
 */
const admin = require("firebase-admin");
admin.initializeApp();

const ADMIN_EMAIL = "seunjoel05@gmail.com";

async function main() {
  const user = await admin.auth().getUserByEmail(ADMIN_EMAIL);
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`Admin claim granted to ${ADMIN_EMAIL}`);
}
main().catch(err => { console.error(err); process.exit(1); });
