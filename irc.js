//oauth:g03oc1tb0tveoadkq61z4sczggevuu1
var settings = {
channels : ["#thegdstudio"],
server : "irc.twitch.tv",
port: 6667,
secure: false,
nick : "laz414",
password : "oauth:g03oc1tb0tveoadkq61z4sczggevuu1"
};


var words_to_match = [
	"Kappa",
	"sing"
];

var length = words_to_match.length;

var irc = require("irc");
var bot = new irc.Client(settings.server, settings.nick, {
	channels:[settings.channels + " " + settings.password],
	debug: false,
	password: settings.password,
	username: settings.nick
});

//bot.addListener("join", function(channel, who) {
//	console.log(who + "joined");
//});

bot.addListener('message#thegdstudio', function(from, message) {
	//console.log(from + ' : ' + message);
	for(var i = 0; i < length; ++i) {
		var re = new RegExp(words_to_match[i], 'i');
		if(message.match(re)) {
			console.log("MATCHED " + words_to_match[i] + " " + from + " said " + message);
			break;
		}
	}
});
