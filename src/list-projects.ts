import 'dotenv/config';
import { TempperaSDK } from './TempperaSDK.js';
const baseUrl = process.env.API_URL;
if(!baseUrl) {
  throw new Error("you need to set API_URL environment variable")
}
const username = process.env.USERNAME;
if(!username) {
  throw new Error("you need to set USERNAME environment variable")
}
const password = process.env.PASSWORD;
if(!password) {
  throw new Error("you need to set PASSWORD environment variable")
}

const sdk = new TempperaSDK({
  baseUrl, username, password
});
try {
  await sdk.login();

  const findResults = await sdk.findProjects("toco");
  console.log(findResults.rows)

} finally {
  await sdk.logout();
  console.log("Logged out successfully");
}
