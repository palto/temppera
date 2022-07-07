import 'dotenv/config';
import { TempperaSDK } from './src/sdk.js';
const url = process.env.API_URL;
if(!url) {
  throw new Error("you need to set API_URL environment variable")
}

const sdk = new TempperaSDK(url, fetch);

const html = await sdk.getData();
console.log(html);
