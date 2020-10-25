const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require("../db.json")
const phrase = require("../phrases.json")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.TOKEN);

module.exports = new Scene('active',
  async (ctx) => {
     ctx.scene.next();
   await ctx.reply('Отлично! Что ты умеешь или в чем хочешь развиватся?', null, Markup
    .keyboard([
      [
        Markup.button('Снимать видосы', 'primary'),
        Markup.button('Писать музыку', 'primary'),
        Markup.button('Делать посты', 'primary'),
      ],
      [
        Markup.button('Дизайнить', 'primary'),
        Markup.button('Фотографировать', 'primary'),
      ],
      [
        Markup.button('Устраивать крутейшие мероприятия', 'primary'),
        Markup.button('Помогать общажникам', 'primary'),
      ],
      [
        Markup.button('Контроллировать крутотень обучения', 'primary')
      ],
      [
        Markup.button('Помогать своему институту', 'primary')
      ]
    ])
    .oneTime(true));
  },
  async (ctx) => {
    if (ctx.message.text === 'Помогать своему институту'){
       ctx.scene.next();
     await ctx.reply('С какого ты института?', null, Markup
      .keyboard([
        [
          Markup.button('ИТС', 'primary'),
          Markup.button('ИЯЭиТФ', 'primary'),
        ],
        [
          Markup.button('ИПТМ', 'primary'),
          Markup.button('ИРИТ', 'primary'),
        ],
        [
          Markup.button('ИНЭУ', 'primary'),
          Markup.button('ИНЭЛ', 'primary'),
        ],
        [
          Markup.button('ИФХТиМ', 'primary'),
        ],
        [
          Markup.button(phrase.start.to_start)
        ],
      ])
      .oneTime(true));
    } else{
       ctx.scene.next();
      switch (ctx.message.text){
        case 'Снимать видосы':
        case 'Писать музыку': 
        case 'Делать посты': 
        case 'Дизайнить': 
        case 'Фотографировать':
          {
         await ctx.reply('Отлично! С тобой свяжется руководитель информационно-аналитического отдела '+db.leaders.iao.name, null,  Markup
          .keyboard([
            [
              Markup.button(phrase.start.anotherq),
            ]
          ])).then(()=>{
            bot.sendMessage(db.leaders.iao.id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
          })
          
          ctx.scene.leave();
          break;
          }
        case 'Устраивать крутейшие мероприятия':
          {
            await ctx.reply('Отлично! С тобой свяжется председатель культурно-массового сектора '+db.leaders.kms.name, null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.anotherq),
              ]
            ])).then(()=>{
              bot.sendMessage(db.leaders.kms.id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
            });
            ctx.scene.leave();
            break;
          }
        case 'Защищать студентов общаги от несправедливости':
          {
            await ctx.reply('Отлично! С тобой свяжется председатель жилично-бытовой комиссии '+db.leaders.zhbk.name, null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.anotherq),
              ]
            ])).then(()=>{
              bot.sendMessage(db.leaders.zhbk.id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
            });
            ctx.scene.leave();
            break;
          }
        case 'Контроллировать крутотень обучения':
        {
          await ctx.reply('Отлично! С тобой свяжется председатель комиссии общественного контроля '+db.leaders.kok.name, null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.anotherq),
            ]
          ])).then(()=>{
            bot.sendMessage(db.leaders.kok.id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
          });
          ctx.scene.leave();
          break;

        }
        case 'Помогать общажникам':
          {
            await ctx.reply('Отлично! С тобой свяжется председатель жилищно-бытовой комиссии '+db.leaders.zhbk.name, null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.anotherq),
              ]
            ])).then(()=>{
              bot.sendMessage(db.leaders.zhbk.id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Умеет или хочет: '+ctx.message.text);
            });
            ctx.scene.leave();
            break;
          }
        default:
          await ctx.reply('Не понимаю тебя, вернись в начало и попробуй еще раз', null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.anotherq),
            ]
          ]));
          ctx.scene.leave();
          break;
      }
    }
  },
  async (ctx) => {
    let id = 0;
    let name = '';
    switch (ctx.message.text){
      case 'ИРИТ':
        {
          id = db.leaders.irit.id;
          name = db.leaders.irit.name;
          break;
        }
      case 'ИТС':
        {
          id = db.leaders.its.id;
          name = db.leaders.its.name;
          break;
        }
      case 'ИНЭЛ':
        {
          id = db.leaders.inel.id;
          name = db.leaders.inel.name;
          break;
        }
      case 'ИНЭУ':
        {
          id = db.leaders.ineu.id;
          name = db.leaders.ineu.name;
          break;
        }
      case 'ИФХТиМ':
        {
          id = db.leaders.ifhtim.id;
          name = db.leaders.ifhtim.name;
          break;
        }
      case 'ИЯЭиТФ':
        {
          id = db.leaders.iyaeitf.id;
          name = db.leaders.iyaeitf.name;
          break;
        }
      case 'ИПТМ':
        {
          id = db.leaders.iptm.id;
          name = db.leaders.iptm.name;
          break;
        }
    }
   await ctx.reply('Отлично! С тобой свяжется председатель твоего профбюро '+name, null, Markup
   .keyboard([
     [
       Markup.button(phrase.start.anotherq),
     ]
   ])).then(()=>{
      bot.sendMessage(id, 'Кандидат: vk.com/id'+ctx.message.from_id+' Хочет работать в профбюро');
    })
     ctx.scene.leave();
  });