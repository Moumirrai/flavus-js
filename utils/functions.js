const { MessageEmbed } = require('discord.js');
const ee = require(`${process.cwd()}/config/embed.json`)
const toTime = require('to-time');

module.exports.handlemsg = handlemsg;
module.exports.nFormatter = nFormatter;
module.exports.shuffle = shuffle;
module.exports.delay = delay;
module.exports.duration = duration;
module.exports.createBar = createBar;
module.exports.format = format;
module.exports.escapeRegex = escapeRegex;
module.exports.arrayMove = arrayMove;
module.exports.isValidURL = isValidURL;
module.exports.createQueueEmbed = createQueueEmbed;


function handlemsg(txt, options) {
  let text = String(txt);
  for (const option in options) {
    var toreplace = new RegExp(`{${option.toLowerCase()}}`, "ig");
    text = text.replace(toreplace, options[option]);
  }
  return text;
}

function isValidURL(string) {
  const args = string.split(" ");
  let url;
  for (const arg of args) {
    try {
      url = new URL(arg);
      url = url.protocol === "http:" || url.protocol === "https:";
      break;
    } catch (_) {
      url = false;
    }
  }
  return url;
};

function shuffle(a) {
  try {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}


function duration(duration, useMilli = false) {
  let remain = duration;
  let days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);
  let hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);
  let minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);
  let seconds = Math.floor(remain / (1000));
  remain = remain % (1000);
  let milliseconds = remain;
  let time = {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
  let parts = []
  if (time.days) {
    let ret = time.days + ' Day'
    if (time.days !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (time.hours) {
    let ret = time.hours + ' Hr'
    if (time.hours !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (time.minutes) {
    let ret = time.minutes + ' Min'
    if (time.minutes !== 1) {
      ret += 's'
    }
    parts.push(ret)

  }
  if (time.seconds) {
    let ret = time.seconds + ' Sec'
    if (time.seconds !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (useMilli && time.milliseconds) {
    let ret = time.milliseconds + ' ms'
    parts.push(ret)
  }
  if (parts.length === 0) {
    return ['instantly']
  } else {
    return parts
  }
}

function delay(delayInms) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}

function createBar(player) {
  let { size, arrow, block } = ee.progress_bar;
    //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", "🔷")
    if (!player.queue.current) return `**[${slider}${line.repeat(size - 1)}${rightindicator}**\n**00:00:00 / 00:00:00**`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    const progress = Math.round((size * current / total));
    const emptyProgress = size - progress;
    const progressString = block.repeat(progress) + arrow + block.repeat(emptyProgress);
    const bar = progressString;
    const times = `${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}`;
    return `[${bar}][${times}]`;
}


function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}

function arrayMove(array, from, to) {
  try {
    array = [...array];
    const startIndex = from < 0 ? array.length + from : from;
    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = to < 0 ? array.length + to : to;
      const [item] = array.splice(from, 1);
      array.splice(endIndex, 0, item);
    }
    return array;
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}


function nFormatter(num, digits = 2) {
  const lookup = [{
      value: 1,
      symbol: ""
    },
    {
      value: 1e3,
      symbol: "k"
    },
    {
      value: 1e6,
      symbol: "M"
    },
    {
      value: 1e9,
      symbol: "G"
    },
    {
      value: 1e12,
      symbol: "T"
    },
    {
      value: 1e15,
      symbol: "P"
    },
    {
      value: 1e18,
      symbol: "E"
    }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function createQueueEmbed(player, index) {
    const tracks = player.queue
    const embed = new MessageEmbed()
    .setTitle("Queue" + `  -  [ ${tracks.length} Tracks ]`)
    .setColor(ee.color)
    let string = "";
    var indexes = [];
    var titles = [];
    var durations = [];
    const loadindexes = tracks.map((track, index) => indexes.push(`${++index}`));
    const loadtitles = tracks.map((track, index) => {
        let string = `${escapeRegex(track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]"))}`
        if (string.length > 37) {
            string = `${string.substr(0, 37)}...`
        }
        titles.push(string)
    });
    const loaddurations = tracks.map((track, index) => durations.push(`${track.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}`));
    let npstring = `${escapeRegex(tracks.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]"))}`
    if (npstring.length > 37) {
        string = `**Now Playing - ` + `${npstring.substr(0, 37)}...**` + `\n${tracks.current.isStream ? `[:red_circle: LIVE STREAM]` : createBar(player)}\n`
    } else {
        string = `**Now Playing - ` + npstring + `**\n${tracks.current.isStream ? `[:red_circle: LIVE STREAM]` : createBar(player)}\n`
    }

    if (indexes.length <= 10) {
        string += `\n`
        for (let i = 0; i < tracks.length; i++) {
            //check if any index in track is longer than 1 digit
            let line = `**${indexes[i]})** ${titles[i]} - [${durations[i]}]`
            string += line + "\n";
        }
        string += "\n" + "This is the end of the queue!" + "\n" + "Use -play to add more :^)"
        embed.setDescription(string)
        .setFooter("Page " + Math.ceil((index + 15) / 15) + " of " + Math.ceil(tracks.length / 15))
        .setThumbnail(tracks.current.thumbnail)
        return embed
    } else {
        indexes = indexes.slice(index, index + 15)
        titles = titles.slice(index, index + 15)
        durations = durations.slice(index, index + 15)
        string += `\n`
        for (let i = 0; i < indexes.length; i++) {
            let line = `**${indexes[i]})** ${titles[i]} - [${durations[i]}]`
            string += line + "\n";
        }
        if (Math.ceil((index + 15) / 15) == Math.ceil(tracks.length / 15)) string += "\n" + "This is the end of the queue!" + "\n" + "\n" + "Use -play to add more :^)"
        embed.setDescription(string)
        .setFooter("Page " + Math.ceil((index + 15) / 15) + " of " + Math.ceil(tracks.length / 15))
        .setThumbnail(tracks.current.thumbnail)
        return embed
    }
}



/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */