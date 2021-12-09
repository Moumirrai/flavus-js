var {
    Manager
  } = require("erela.js");
  var Spotify = require("erela.js-spotify");
  var Facebook = require("erela.js-facebook");
  var config = require(`${process.cwd()}/config/config.json`);
  
  clientID = process.env.clientID || config.spotify.clientID,
    clientSecret = process.env.clientSecret || config.spotify.clientSecret;
  module.exports = (client) => {
    client.manager = new Manager({
    nodes: config.clientsettings.nodes,
    plugins: [
        new Spotify({
        clientID,
        clientSecret
        }),
        new Facebook(),
    ],
    send(id, payload) {
        var guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
    });

    client.clog(`Erela initialized!`.log);
  
  
    client.once("ready", () => {
      client.manager.init(client.user.id);
    });
    //require the other events
    require("./node_events")(client)
    //require("./events")(client)
  
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.dev
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */
  