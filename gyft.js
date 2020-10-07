var apiKey = "YOUR_API_KEY";
var apiSecret = "YOUR_SECRET";
var timeStamp = Math.round(new Date().getTime() / 1000).toString();
var stringToSign = apiKey + apiSecret + timeStamp;
var sha256 = require("crypto").createHash("sha256");
var signature = sha256.update(stringToSign).digest("hex");

console.log("sig: ", signature)
console.log("timestamp: ", timeStamp);
var https = require("https");

console.log("Calling Gyft API");
https.get(
  {
    hostname: "apitest.gyft.com",
    port: 443,
    method: "GET",
    path:
      "/mashery/v1/reseller/account?api_key=" + apiKey + "&sig=" + signature,
    headers: { "x-sig-timestamp": timeStamp },
  },
  function (res) {
    console.log("got res", res.statusCode);

    res.on("data", (d) => {
      console.dir(JSON.parse(d, null, 4), { depth: null, colors: true });
    });
    res.on("error", (e) => {
      console.log("error", e);
    });
  }
);
