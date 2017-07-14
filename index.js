var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    bot = new TelegramBot("389095281:AAHSKzbSClYOACeUkl4vUccHPgGF0OZozJs", { polling: true });

var h36preflight = [
	"pre H36 1) Transmitter throttle zero",
	"pre H36 2) Transmitter main switch on",
	"pre H36 3) Transmitter placed on ground",
	"pre H36 4) Microdrone propellers undamaged",
	"pre H36 5) Microdrone frame undamaged",
	"pre H36 6) Microdrone battery inserted",
	"pre H36 7) Microdrone battery connected",
	"pre H36 8) Microdrone and transmitter bounded"
];

var h36postflight = [
	"post H36 1) Transmitter throttle zero",
	"post H36 2) Transmitter main switch on",
	"post H36 3) Transmitter placed on ground",
	"post H36 4) Microdrone battery disconnected",
	"post H36 5) Microdrone battery removed",
	"post H36 6) Microdrone propellers undamaged",
	"post H36 7) Microdrone body undamaged",
	"post H36 8) Transmitter main switch off"
];

var f450preflight = [
	"pre F450 1) Transmitter throttle zero",
	"pre F450 2) Transmitter switches off",
	"pre F450 3) Drone battery mounted",
	"pre F450 4) Drone battery disconnected",
	"pre F450 5) Propellers mounted and tightened",
	"pre F450 6) Transmitter main switch on",
	"pre F450 7) Drone Battery connected",
	"pre F450 8) Pixhawk ready tone played",
	"pre F450 9) Pixhawk safety switch flashing",
	"pre F450 10) Pixhawk safety switch pressed, steady red",
	"pre F450 11) Surrounding clear",
	"pre F450 12) Arm drone",
	"pre F450 13) Stand clear of drone",
	"pre F450 14) Push throttle one notch",
	"pre F450 15) Move throttle back to zero"
];

var f450postflight = [
	"post F450 1) Transmitter throttle zero",
	"post F450 2) Transmitter main switch on",
	"post F450 3) Disarm drone",
	"post F450 4) Push throttle one notch, propellers don't spin",
	"post F450 5) Transmitter throttle zero",
	"post F450 6) Pixhawk safety switch pressed, flashing",
	"post F450 7) Drone battery disconnected",
	"post F450 8) Transmitter main switch off"
];

var f450crash = [
	"crash F450 1) Transmitter throttle zero",
	"crash F450 2) Transmitter main switch on",
	"crash F450 3) Disarm drone",
	"crash F450 4) Push throttle one notch, propellers don't spin",
	"crash F450 5) Transmitter throttle zero",
	"crash F450 6) Pixhawk safety switch pressed, flashing",
	"crash F450 7) Drone battery disconnected",
	"crash F450 8) Check drone structure",
	"crash F450 9) Check drone propellers",
	"crash F450 10) Check drone motor",
	"crash F450 11) check drone batteries",
	"crash F450 12) if batteries damaged, see instructor"
	
];

bot.on("text", (msg) => {
	console.log(msg);
	//check for h36preflight
	h36preflightCheck(msg);
	h36postflightCheck(msg);
	f450preflightCheck(msg);
	f450postflightCheck(msg);
	f450crashCheck(msg);
});

function f450crashCheck(msg){
	for (var i=0; i < f450crash.length; i++) {
		if (msg.text.includes(f450crash[f450crash.length-1])) {
			bot.sendMessage(msg.chat.id, "crash check completed!", {
			"reply_markup": {
				"keyboard": [["/Main Menu"]]
				}
			});
			return;
		}else if (msg.text.includes(f450crash[i])){
			bot.sendMessage(msg.chat.id, f450crash[i+1], {
			"reply_markup": {
				"keyboard": [["/Main Menu"],[f450crash[i+1]]]
				}
			});
		}
	}
}

function f450preflightCheck(msg){
	for (var i=0; i < f450preflight.length; i++) {
		if (msg.text.includes(f450preflight[f450preflight.length-1])) {
			bot.sendMessage(msg.chat.id, "ready to fly!", {
			"reply_markup": {
				"keyboard": [["/Main Menu"]]
				}
			});
			return;
		}else if (msg.text.includes(f450preflight[i])){
			bot.sendMessage(msg.chat.id, f450preflight[i+1], {
			"reply_markup": {
				"keyboard": [["/Main Menu"],[f450preflight[i+1]]]
				}
			});
		}
	}
}

function f450postflightCheck(msg){
	for (var i=0; i < f450postflight.length; i++) {
		if (msg.text.includes(f450postflight[f450postflight.length-1])) {
			bot.sendMessage(msg.chat.id, "post flight completed!", {
			"reply_markup": {
				"keyboard": [["/Main Menu"]]
				}
			});
			return;
		}else if (msg.text.includes(f450postflight[i])){
			bot.sendMessage(msg.chat.id, f450postflight[i+1], {
			"reply_markup": {
				"keyboard": [["/Main Menu"],[f450postflight[i+1]]]
				}
			});
		}
	}
}

function h36preflightCheck(msg){
	for (var i=0; i < h36preflight.length; i++) {
		if (msg.text.includes(h36preflight[h36preflight.length-1])) {
			bot.sendMessage(msg.chat.id, "ready to fly!", {
			"reply_markup": {
				"keyboard": [["/Main Menu"]]
				}
			});
			return;
		}else if (msg.text.includes(h36preflight[i])){
			bot.sendMessage(msg.chat.id, h36preflight[i+1], {
			"reply_markup": {
				"keyboard": [["/Main Menu"],[h36preflight[i+1]]]
				}
			});
		}
	}
}

function h36postflightCheck(msg){
	for (var i=0; i < h36postflight.length; i++) {
		if (msg.text.includes(h36postflight[h36postflight.length-1])) {
			bot.sendMessage(msg.chat.id, "post flight completed!", {
			"reply_markup": {
				"keyboard": [["/Main Menu"]]
				}
			});
			return;
		}else if (msg.text.includes(h36postflight[i])){
			bot.sendMessage(msg.chat.id, h36postflight[i+1], {
			"reply_markup": {
				"keyboard": [["/Main Menu"],[h36postflight[i+1]]]
				}
			});
		}
	}
}

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Hello, "+msg.from.username, {
	"reply_markup": {
		"keyboard": [["/H36 Microdrone", "/F450 with pixhawk"]]
		}
	});
});

bot.onText(/\/Main Menu/, (msg) => {
	bot.sendMessage(msg.chat.id, "Hello, "+msg.from.username, {
	"reply_markup": {
		"keyboard": [["/H36 Microdrone", "/F450 with pixhawk"]]
		}
	});
});

bot.onText(/\/F450 with pixhawk/, (msg) => {
	bot.sendMessage(msg.chat.id, "Select checklist", {
		"reply_markup": {
			"keyboard": [["/Main Menu"],["/F450 Pre-flight", "/F450 Post-flight"],["/F450 crash"]]
		}
	});
});

bot.onText(/\/H36 Microdrone/, (msg) => {
	bot.sendMessage(msg.chat.id, "Select checklist", {
		"reply_markup": {
			"keyboard": [["/Main Menu"],["/H36 Pre-flight", "/H36 Post-flight"]]
		}
	});
});

bot.onText(/\/H36 Pre-flight/, (msg) => {
	bot.sendMessage(msg.chat.id, h36preflight[0], {
	"reply_markup": {
		"keyboard": [["/Main Menu"],[h36preflight[0]]]
		}
	});
});

bot.onText(/\/H36 Post-flight/, (msg) => {
	bot.sendMessage(msg.chat.id, h36postflight[0], {
	"reply_markup": {
		"keyboard": [["/Main Menu"],[h36postflight[0]]]
		}
	});
});

bot.onText(/\/F450 Pre-flight/, (msg) => {
	bot.sendMessage(msg.chat.id, f450preflight[0], {
	"reply_markup": {
		"keyboard": [["/Main Menu"],[f450preflight[0]]]
		}
	});
});

bot.onText(/\/F450 Post-flight/, (msg) => {
	bot.sendMessage(msg.chat.id, f450postflight[0], {
	"reply_markup": {
		"keyboard": [["/Main Menu"],[f450postflight[0]]]
		}
	});
});

bot.onText(/\/F450 crash/, (msg) => {
	bot.sendMessage(msg.chat.id, f450crash[0], {
	"reply_markup": {
		"keyboard": [["/Main Menu"],[f450crash[0]]]
		}
	});
});
