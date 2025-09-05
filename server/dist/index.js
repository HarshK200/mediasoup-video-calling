"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./ExpressApp/server");
const dotenv_1 = require("dotenv");
// load environment variables
(0, dotenv_1.config)();
const PORT = 8080;
// the express server
let expressApp;
async function main() {
    expressApp = (0, server_1.CreateExpressServer)();
    expressApp.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
main();
//# sourceMappingURL=index.js.map