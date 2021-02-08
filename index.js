require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();//Making a discord bot client
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()
const { Player } = require("discord-player")
const player = new Player(client)
client.player = player;
client.config = {
  prefix: ".",
  MongoDB: "mongodb://u4hyvhts2vyriyhtg2do:ojIfYJlDhxZ0yD2fAazO@byruqeacfwrvcd7-mongodb.services.clever-cloud.com:27017/byruqeacfwrvcd7",
  Token: "",
  support: "https://discord.gg/tU2HMUH8UR"
  
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});
//Logging in to discord
client.login(client.config.Token)
