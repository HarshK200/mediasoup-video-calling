import { Worker } from "mediasoup/types";
import { CreateExpressServer } from "./ExpressApp/server";
import { config } from "dotenv";
import { runMediasoupWorkers } from "./Mediasoup";

// load environment variables
config();

const PORT = 8080;

// mediasoup workers
const mediasoupWorkers: Worker[] = [];

// the express server
let expressApp;

async function main() {
  expressApp = CreateExpressServer();

  // startup mediasoup workers
  await runMediasoupWorkers(mediasoupWorkers, 4);

  // start the express server
  expressApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main();
