import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import app from "./app";

dotenv.config();

if (process.env.DEV_MODE == "local") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port  http://localhost:${PORT}`);
  });
} else if (process.env.DEV_MODE == "live") {
  const options = {
    key: fs.readFileSync("/home/ec2-user/ssl-privkey.pem"),
    cert: fs.readFileSync("/home/ec2-user/ssl-fullchain.pem"),
  };

  const PORT = process.env.SSL_PORT || 8443;

  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on https://dev.menuline.xyz:${PORT}`);
  });
}
