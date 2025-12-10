const { Telegraf } = require('telegraf');

// التوكن الخاص بك
const bot = new Telegraf('8271096502:AAEnHZcXG1qf6cYSbBee89673V6KofjA8uo');

console.log('🔄 جاري تشغيل البوت...');

// رسالة الترحيب
bot.start((ctx) => {
    ctx.reply('مرحباً يا بطل! 🚀\nأرسل لي أي نص وسأرسمه لك بالذكاء الاصطناعي.');
});

// استقبال النصوص والرسم
bot.on('text', async (ctx) => {
    const userText = ctx.message.text;
    await ctx.reply(`🎨 جاري رسم: "${userText}"...`);
    
    // رابط الرسم
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(userText)}`;
    
    // إرسال الصورة
    await ctx.replyWithPhoto(imageUrl);
});

// إطلاق البوت
bot.launch();

console.log('✅ البوت يعمل الآن بنجاح! اذهب لتيليجرام وجربه.');

// كود الأمان للإغلاق
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));