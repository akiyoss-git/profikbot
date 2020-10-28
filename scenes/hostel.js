const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require('../helpers/database')
const phrase = require("../phrases.json")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.TOKEN);

module.exports = new Scene('hostel', 
    async (ctx)=>{
        ctx.scene.next();
        await ctx.reply(phrase.ans.obsh, 'photo502246455_457259789', Markup
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
                await ctx.reply(phrase.obshansw.zasel, 'photo502246455_457259767', Markup
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
                await ctx.reply(phrase.obshansw.dush, 'photo502246455_457259770', Markup
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
                await ctx.reply(phrase.obshansw.raspis, 'photo502246455_457259771', Markup
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
                await ctx.reply(phrase.obshansw.room, 'photo502246455_457259787', Markup
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
                await ctx.reply('Напишите свой вопрос', 'photo502246455_457256545')
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
        ctx.reply('Для решения этого вопроса с тобой свяжется председатель жилищно-бытовой комиссии '+db.getLeader('zhbk').name, 'photo502246455_457259748', Markup
        .keyboard([
          [
            Markup.button(phrase.start.anotherq, 'positive'),
          ]
        ])
        .oneTime(true)).then(()=>{
            bot.sendMessage(db.getLeader('zhbk').id, 'Вопрос: '+ctx.message.text+'\nЗадает vk.com/id'+ctx.message.from_id)
        })
        ctx.scene.leave();
    })