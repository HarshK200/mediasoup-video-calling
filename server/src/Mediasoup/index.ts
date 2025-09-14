import { createWorker } from "mediasoup";
import { Worker } from "mediasoup/types";

export async function runMediasoupWorkers(
  mediasoupWorkers: Worker[],
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
    mediasoupWorkers.push(worker);
  }

  console.log(`Wokers created!\n${mediasoupWorkers.length} workers running`);
}
