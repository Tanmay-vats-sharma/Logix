// AblyService.js
const dotenv = require("dotenv");
dotenv.config(); // MUST be first

const Ably = require("ably");

if (!process.env.ABLY_API_KEY) {
  console.error("❌ ABLY_API_KEY missing! Please set it in .env at the backend root.");
  process.exit(1); // stop server if key missing
}

const ably = new Ably.Rest("mt3J6A.mrbI_w:VpUciyEoJz6YfU8ttNcd6cS77l72Ogs3J4MpT_BWrBI");


const createToken = async () => {
  const tokenRequest = await ably.auth.createTokenRequest({clientId: 'my-client-id'});
  return tokenRequest;
};

module.exports = { createToken, ably };
