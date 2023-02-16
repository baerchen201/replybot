const d = require("discord.js");

const token =
  ""; //bot token here
const activity = {
  name: "amog us", //activity text here
  type: d.ActivityType.Playing, //activity type here
};

const client = new d.Client({
  intents: [
    d.IntentsBitField.Flags.Guilds,
    d.IntentsBitField.Flags.GuildMembers,
    d.IntentsBitField.Flags.GuildMessages,
    d.IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
  console.log();
  c.user.setActivity(activity);
});

client.login(token);

client.on("interactionCreate", async (int) => {
  if (!int.isChatInputCommand()) {
    return;
  }
  console.log("----------");
  console.log(`${int.user.tag} used command /${int.commandName}`);

  if (int.commandName === "say") {
    int.reply({
      content: `sending message '${int.options.getString(
        "message"
      )}' in channel '${int.options.getChannel("channel").name}'.`,
      ephemeral: true,
    });
    int.options.getChannel("channel").send(int.options.getString("message"));
    /*console.log(int.options.getChannel("channel").name);
    console.log(int.options.getString("message"));*/ //old logs

    console.log();
    console.log(`sending message
    '${int.options.getString("message")}' 
to channel
    '${int.options.getChannel("channel").name}' ${
      int.options.getChannel("channel").id
    }

as requested by ${int.user.username}`);
  } else if (int.commandName === "reply") {
    /*console.log(int.options.getString("message-id"));
    console.log(int.options.getString("message"));
    console.log(int.options.getBoolean("hidden"));*/ //old logs
    let messageManager = new d.MessageManager(
      int.options.getChannel("channel")
    );
    try {
      var validmsg = await messageManager.fetch(
        int.options.getString("message-id")
      );
      validmsg = true;
    } catch (error) {
      validmsg = false;
    }

    if (validmsg) {
      try {
        let message = await messageManager.fetch(
          int.options.getString("message-id")
        );
        console.log();
        console.log(`answering with 
    '${int.options.getString("message")}' 
to message
    id: ${int.options.getString("message-id")}
in channel 
    '${int.options.getChannel("channel").name}' ${
          int.options.getChannel("channel").id
        }
sent by ${message.author.tag}

as requested by ${int.user.username}`);
        message.reply({
          content: int.options.getString("message"),
          ephemeral: int.options.getBoolean("hidden"),
        });
        int.reply({
          content: `answering to message
'${message.content}'
with '${int.options.getString("message")}'`,
          ephemeral: true,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      int.reply({
        content: "Invalid message id or wrong channel.",
        ephemeral: true,
      });
      console.log();
      console.log(`tried to answer with 
    '${int.options.getString("message")}' 
to message
    id: ${int.options.getString("message-id")}
in channel 
    '${int.options.getChannel("channel").name}' ${
        int.options.getChannel("channel").id
      }
but failed to find message.

requested by ${int.user.username}`);
    }
  } else if (int.commandName === "at") {
    try {
      int.options
        .getChannel("channel")
        .send(
          int.options.getString("message") +
            "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ _" +
            "@" +
            int.options.getRole("role").name
        );

      int.reply({
        content: `sending message '${int.options.getString(
          "message"
        )}' in channel '${int.options.getChannel("channel").name}' 
and pinging '${int.options.getRole("role").name}'.`,
        ephemeral: true,
      });
      //no old logs this time :)

      console.log();
      console.log(`sending message
    '${int.options.getString("message")}' 
to channel
    '${int.options.getChannel("channel").name}' ${
        int.options.getChannel("channel").id
      }
with ping to '${int.options.getRole("role").name}'
    
as requested by ${int.user.username}`);
    } catch (error) {
      console.error(error);
    }
  }
  console.log("----------");
  console.log();
});
