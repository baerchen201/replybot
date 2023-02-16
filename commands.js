const guild_id = ""; //server id here
const client_id = ""; //bot user id on the server

const d = require("discord.js");

var commands = [
  {
    name: "say",
    description: "says something in a channel",
    options: [
      {
        name: "channel",
        description: "the channel to send the message to",
        type: d.ApplicationCommandOptionType.Channel,
        required: true,
      },
      {
        name: "message",
        description: "the message to send",
        type: d.ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "at",
    description: "@-message",
    options: [
      {
        name: "channel",
        description: "the channel to send the message to",
        type: d.ApplicationCommandOptionType.Channel,
        required: true,
      },
      {
        name: "message",
        description: "the message to send",
        type: d.ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "role",
        description: "the group to send the message to",
        type: d.ApplicationCommandOptionType.Role,
        required: true,
      },
    ],
  },
  {
    name: "reply",
    description: "reply to a message",
    options: [
      {
        name: "message-id",
        description: "the channel to send the message to",
        type: d.ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "channel",
        description: "the channel where the message id is.",
        type: d.ApplicationCommandOptionType.Channel,
        required: true,
      },
      {
        name: "message",
        description: "the message to send",
        type: d.ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new d.REST({ version: "10" }).setToken(
  "MTA3NTQxODIzMDYzNTYzODc5NQ.GufUm6.T7XqIL68SrtZ3xpT4trDUeQ_HYnNsXmqmX53-I"
);

async function registercommands() {
  try {
    await rest.put(d.Routes.applicationGuildCommands(client_id, guild_id), {
      body: commands,
    });

    console.log("Commands registered");
  } catch (error) {
    console.log(error);
  }
}

registercommands();
