const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require("../db.json")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.TOKEN);

module.exports = new Scene('hostel', 
    async (ctx)=>{
        ctx.scene.next();
        await ctx.reply(phrase.ans.obsh, null, Markup
            .keyboard([
              [
                Markup.button(phrase.obsh.dush, 'positive'),
                Markup.button(phrase.obsh.raspis, 'positive'),
              ],
              [
                Markup.button(phrase.obsh.room, 'positive'),
                Markup.button(phrase.obsh.zasel, 'positive'),
              ],
              [
                Markup.button('Иной вопрос', 'positive')
              ],
              [
                Markup.button(phrase.start.to_start, 'positive'),
              ]
            ])
            .oneTime(true))
    },
    async (ctx)=>{
        switch(ctx.message.text){
            case phrase.obsh.zasel:{
                await ctx.reply(phrase.obshansw.zasel, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ]
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case phrase.obsh.dush:{
                await ctx.reply(phrase.obshansw.dush, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ]
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case phrase.obsh.raspis:{
                await ctx.reply(phrase.obshansw.raspis, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ]
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case phrase.obsh.room:{
                await ctx.reply(phrase.obshansw.room, null, Markup
                    .keyboard([
                      [
                        Markup.button(phrase.start.anotherq, 'positive'),
                      ]
                    ])
                    .oneTime(true))
                ctx.scene.leave();
                break;
            }
            case 'Иной вопрос':{
                await ctx.reply('Напишите свой вопрос', null)
                ctx.scene.next();
                break;
            }
            default:
                {
                    ctx.scene.leave();
                    break;
                }
        }
    },
    async (ctx)=>{
        ctx.reply('Для решения этого вопроса с тобой свяжется председатель жилищно-бытовой комиссии '+db.leaders.zhbk.name, null, Markup
        .keyboard([
          [
            Markup.button(phrase.start.anotherq, 'positive'),
          ]
        ])
        .oneTime(true)).then(()=>{
            bot.sendMessage(db.leaders.zhbk.id, 'Вопрос: '+ctx.message.text+'\nЗадает vk.com/id'+ctx.message.from_id)
        })
        ctx.scene.leave();
    })