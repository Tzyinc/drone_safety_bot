var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    bot = new TelegramBot("389095281:AAHSKzbSClYOACeUkl4vUccHPgGF0OZozJs", { polling: true });

var h36preflight = [
	"1) H36 Transmitter throttle zero",
	"2) H36 Transmitter main switch on",
	"3) H36 Transmitter placed on ground",
	"4) Microdrone propellers undamaged",
	"5) Microdrone frame undamaged",
	"6) Microdrone battery inserted",
	"7) Microdrone battery connected",
	"8) Microdrone and transmitter bounded"
];

bot.on("text", (msg) => {
	console.log(msg);
	//check for h36preflight
	h36preflightCheck(msg);
});

function h36preflightCheck(msg){
	for (var i=0; i < h36preflight.length; i++) {
		if (msg.text.includes(h36preflight[h36preflight.length-1])) {
			bot.sendMessage(msg.chat.id, "ready to fly!", {
			"reply_markup": {
				"keyboard": [["Main Menu"]]
				}
			});
			return;
		}else if (msg.text.includes(h36preflight[i])){
			bot.sendMessage(msg.chat.id, h36preflight[i+1], {
			"reply_markup": {
				"keyboard": [["Main Menu"],[h36preflight[i+1]]]
				}
			});
		}
	}
	
}

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Hello, "+msg.from.username, {
	"reply_markup": {
		"keyboard": [["H36 Microdrone", "F450"]]
		}
	});
});

bot.onText(/H36 Microdrone/, (msg) => {
	bot.sendMessage(msg.chat.id, "Select checklist", {
		"reply_markup": {
			"keyboard": [["Main Menu"],["H36 Pre-flight", "H36 Post-flight"]]
		}
	});
});

bot.onText(/Main Menu/, (msg) => {
	bot.sendMessage(msg.chat.id, "Hello, "+msg.from.username, {
	"reply_markup": {
		"keyboard": [["H36 Microdrone", "F450"]]
		}
	});
});

bot.onText(/H36 Pre-flight/, (msg) => {
	bot.sendMessage(msg.chat.id, h36preflight[0], {
	"reply_markup": {
		"keyboard": [["Main Menu"],[h36preflight[0]]]
		}
	});
});

