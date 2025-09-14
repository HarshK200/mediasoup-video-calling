import { CreateExpressServer } from "./ExpressApp/server";
import { config } from "dotenv";
import { runMediasoupWorkers } from "./Mediasoup";
import { T_mediasoupObj } from "./types";

// load environment variables
config();

const PORT = 8080;

// mediasoup workers
const mediasoupObj: T_mediasoupObj = {
  workers: [],
  nextWokerIdx: -1,
};

// the express server
let expressApp;

// streams hashmap
const streams = {};

async function main() {
  expressApp = CreateExpressServer();

  // startup mediasoup workers
  await runMediasoupWorkers(mediasoupObj, 4);

  // PERF: debug
  console.log(
    `Wokers created!\n${mediasoupObj.workers.length} workers running`,
  );

  // start the express server
  expressApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main();
