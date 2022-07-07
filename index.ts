import 'dotenv/config';
import { getData } from './src/sdk.js';
const url = process.env.API_URL;
if(!url) {
  throw new Error("you need to set API_URL environment variable")
}

const html = await getData(url);
console.log(html);
