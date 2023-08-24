const boxConsole = require('box-console');
const set = require(`${process.cwd()}/Assets/Config/settings`)
module.exports = {
  async execute(client) {
    let aio = `Welcome to ${'Server Handler'.bold.blue} by ${'ALL IN ONE | Development'.red}`;
    let aio_server = `Support:- ${`https://discord.gg/wAp6Wr2emN`.brightGreen}`
    let Uo = `Coded By ${`Uo#1428`.brightCyan.bold}`;
    let syntax = `Modified By ${`@jarvisplayz`.brightRed.bold} | Syntax Studios`
    console.clear()
    boxConsole([aio, aio_server, Uo, syntax]);
    // Console Logger
    client.logger = (data) => {
      var currentdate = new Date();
      let logstring = ` ${`${`${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`.brightBlue.bold} ${`│`.brightMagenta.bold}`
        }`
      if (typeof data == "string") {
        console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
      } else if (typeof data == "object") {
        console.log(logstring, JSON.stringify(data, null, 3).green)
      } else if (typeof data == "boolean") {
        console.log(logstring, String(data).cyan)
      } else {
        console.log(logstring, data)
      }
    };
  }
}