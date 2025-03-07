const { Telegraf } = require('telegraf');

const BOT_TOKEN = '8078512100:AAEfHFr-gSeE2AsTS7TB_puNoVNELkSnnXs';
const WEB_APP_URL = "https://root0217.github.io/my-tg-webApp/";

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Привет! Я твой бот.'));
bot.help((ctx) => ctx.reply('Я могу ответить на /start и /help.'));
bot.command("open", (ctx) => {
    ctx.reply("Нажми кнопку ниже, чтобы открыть Web App.", {
        reply_markup: {
            inline_keyboard: [
                [{ 
                    text: "Открыть Web App", 
                    web_app: { url: WEB_APP_URL } 
                }]
            ]
        }
    });
});

// Обрабатываем любые текстовые сообщения
bot.on('text', (ctx) => {
    if (ctx.message.text !== "/open") { 
        ctx.reply(`Ты сказал: ${ctx.message.text}`);
    }
});

bot.launch();
console.log('Бот запущен!');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));