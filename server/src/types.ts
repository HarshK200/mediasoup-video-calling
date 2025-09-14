import { Worker } from "mediasoup/types";

export type T_mediasoupObj = {
  workers: Worker[];
  nextWokerIdx: number;
};
