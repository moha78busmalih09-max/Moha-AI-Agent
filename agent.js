const { Telegraf } = require('telegraf');
const http = require('http'); // 1. استدعاء مكتبة السيرفر

// التوكن الخاص بك
const bot = new Telegraf('8271096502:AAEnHZcXG1qf6cYSbBee89673V6KofjA8uo');

console.log('🔄 جاري تشغيل البوت...');

bot.start((ctx) => {
    ctx.reply('مرحباً يا بطل! 🚀\nأرسل لي أي نص وسأرسمه لك بالذكاء الاصطناعي.');
});

bot.on('text', async (ctx) => {
    const userText = ctx.message.text;
    await ctx.reply(`🎨 جاري رسم: "${userText}"...`);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(userText)}`;
    await ctx.replyWithPhoto(imageUrl);
});

// 2. تشغيل البوت
bot.launch();

// ---------------------------------------------------------
// 3. الخدعة: إنشاء سيرفر وهمي لإرضاء Render
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bot is running successfully!');
});

server.listen(PORT, () => {
    console.log(`✅ البوت يعمل الآن والسيرفر مفتوح على المنفذ ${PORT}`);
});
// ---------------------------------------------------------

// كود الأمان
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
