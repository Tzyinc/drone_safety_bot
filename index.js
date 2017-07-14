var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("389095281:AAHSKzbSClYOACeUkl4vUccHPgGF0OZozJs", { polling: true });

telegram.on("text", (message) => {
  telegram.sendMessage(message.chat.id, "Hello world");
});
