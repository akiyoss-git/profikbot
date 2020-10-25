const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');

module.exports = new Scene('partnership',
async (ctx)=>{
  ctx.scene.next();
  await ctx.reply('Напишите ваше предложение: ')
}, 
  async (ctx )=>{
  await ctx.reply('Ваше предложение будет рассмотрено в ближайшее время!', null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.to_start)
    ]
  ]))
  ctx.scene.leave()
})