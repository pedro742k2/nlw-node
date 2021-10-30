import { serverHttp } from "./app";

const PORT = parseInt(process.env.PORT) || 4000;

serverHttp.listen(PORT, () =>
  console.log(`🚀 Server is running on port ${PORT}`)
);
