import { createWorker } from "mediasoup";
import { T_mediasoupObj } from "../types";

export async function runMediasoupWorkers(
  mediasoupObj: T_mediasoupObj,
  numberWorkers: number,
) {
  for (let i = 0; i < numberWorkers; i++) {
    // create worker
    const worker = await createWorker();

    // attach worker crash/died handler
    worker.on("died", () => {
      console.error(
        `mediasoup worker died. exiting in 5 sec... [pid:${worker.pid}]`,
      );

      setTimeout(() => process.exit(1), 5000);
    });

    // push the worker in the mediasoup workers array
    mediasoupObj.workers.push(worker);
  }

  // set the nextWokerIdx to a valid number 0 from -1 (default)
  mediasoupObj.nextWokerIdx = 0;
}

export function getMediasoupWorker(mediasoupObj: T_mediasoupObj) {
  // if the next worker index is invalid return null
  if (mediasoupObj.nextWokerIdx < 0) {
    return null;
  }

  // grab the next worker
  const worker = mediasoupObj.workers[mediasoupObj.nextWokerIdx];

  // update the nextWokerIdx
  if (mediasoupObj.nextWokerIdx + 1 >= mediasoupObj.workers.length) {
    mediasoupObj.nextWokerIdx = 0;
  } else {
    mediasoupObj.nextWokerIdx++;
  }

  // return the mediasoup worker
  return worker;
}
