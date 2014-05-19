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
	"GIFF",
	"GIVE"
];

var re1 = new RegExp(words_to_match[0], 'i');
var re2 = new RegExp(words_to_match[1], 'i');

var length = words_to_match.length;
var what_twitch_wants = new Array();
var MAX = 10;

function what_tw_init() {
	for(var i = 0; i < MAX; i++) {
		what_twitch_wants[i] = new Array();
		for(var j = 0; j < 2; j++) {
			what_twitch_wants[i][j] = 0;
	}
}
}

function summary() {
	console.log("\nTWITCH WANTS");
	var swapped;
    do {
        swapped = false;
        for (var i=0; i < MAX-1; i++) {
            if (what_twitch_wants[i][1] < what_twitch_wants[i+1]) {
                var temp1 = what_twitch_wants[i][0];
                var temp2 = what_twitch_wants[i][1];
                what_twitch_wants[i][0] = what_twitch_wants[i+1][0];
                what_twitch_wants[i][1] = what_twitch_wants[i+1][1]
                what_twitch_wants[i+1][0] = temp1;
                what_twitch_wants[i+1][1] = temp2;
                swapped = true;
            }
        }
    } while (swapped);
    for(i=0; i < MAX; i++) {
    	if(what_twitch_wants[i][0] == 0)
    		continue;
    	console.log((i+1)+") "+what_twitch_wants[i][0]+" VOTES : "+what_twitch_wants[i][1]);
    }
    console.log("PLS GEEF!");
}



var irc = require("irc");
var bot = new irc.Client(settings.server, settings.nick, {
	channels:[settings.channels + " " + settings.password],
	debug: false,
	password: settings.password,
	username: settings.nick
});

what_tw_init();
//bot.addListener("join", function(channel, who) {
//	console.log(who + "joined");
//});

bot.addListener('message#thegdstudio', function(from, message) {
	//console.log(from + ' : ' + message);
	message = message.replace(/[^a-zA-Z ]/g, "");
	var reg1;
	var we_want = 0;
	var parsed_str = message.split(" ");
	for(var i = 0; i < parsed_str.length; ++i) {
		//var re = new RegExp(words_to_match[i], 'i');
		if(parsed_str[i].match(re1) || parsed_str[i].match(re2)) {
			//console.log("MATCHED GIFF twitch wants " + parsed_str[i+1]);
			we_want = parsed_str[i+1];
			break;
		}
	}
	if(we_want == 0)
		return
	for(i = 0; i < MAX ; i++) {
		reg1 = new RegExp(we_want, 'i');
		if(what_twitch_wants[i][0] != 0 && what_twitch_wants[i][0].match(reg1)) {
			what_twitch_wants[i][1]++;
			return;
		}
	}
	for(i = 0; i< MAX; i++) {
		if(what_twitch_wants[i][0] == 0) {
			what_twitch_wants[i][0] = we_want;
			what_twitch_wants[i][1]++;
			return;
		}
	}
});

setInterval(function(){
	console.log("1 HOUR SUMMARY+WIPE");
	summary();
	for(var i = 0; i < MAX; i++) {
		what_twitch_wants[i][0] = 0;
		what_twitch_wants[i][1] = 0;
	}
}, 1000*60*60);

setInterval(function(){
	console.log("60 SEC SUMMARY");
	summary();
}, 1000*60);