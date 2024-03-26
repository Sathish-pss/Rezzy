// getting-started.js
const { connect, connection } = require("mongoose");
connection.on("connected", () => {
  console.log("Mongodb Connected");
});
connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});
connection.on("error", (error) => {
  console.log(error);
});

async function dbConnect() {
  return await connect(process.env.DBURL);
}
module.exports = { dbConnect };
