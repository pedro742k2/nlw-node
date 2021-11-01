"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = parseInt(process.env.PORT) || 4000;
app_1.serverHttp.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
