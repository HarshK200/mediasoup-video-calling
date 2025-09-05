import { CreateExpressServer } from "./ExpressApp/server";
import { config } from "dotenv";

// load environment variables
config();

const PORT = 8080;

// the express server
let expressApp;

async function main() {
  expressApp = CreateExpressServer();

  expressApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main();
