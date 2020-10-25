const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require("./db.json")
const phrase = require("./phrases.json")
const active = require("./scenes/active")
const hostel = require("./scenes/hostel")
const qai = require("./scenes/qai")
const partnership = require('./scenes/partnership')
 
const bot = new VkBot(db.TOKEN);
 
bot.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    console.error(e);
  }
});

bot.command(['Начать', phrase.start.to_start, phrase.start.anotherq], async (ctx) => {
  let text = 'Привет! Я Профик! Я могу ответить тебе на некоторые, интересующие тебя вопросы! Что тебя интересует?'
    if (ctx.message.text === phrase.start.to_start || ctx.message.text === phrase.start.anotherq){
      text = 'Чем я еще могу тебе помочь?'
    }
    await ctx.reply(text, null, Markup
    .keyboard([
      [
        Markup.button( phrase.hellomk.matpom, 'primary'),
        Markup.button( phrase.hellomk.obsh, 'primary'),
        Markup.button( phrase.hellomk.money, 'primary'),
      ],
      [
        Markup.button( phrase.hellomk.inst, 'primary'),
        Markup.button( phrase.hellomk.tonntu, 'primary'),
      ],
      [
        Markup.button( phrase.hellomk.exchangeintonntu, 'primary'),
        Markup.button( phrase.hellomk.exchangeonnntu, 'primary'),
      ],
      [
        Markup.button( phrase.hellomk.active, 'positive'),
      ],
      [
        Markup.button( phrase.hellomk.iwanttoprof, 'positive'),
      ],
      [
        Markup.button(phrase.hellomk.partnership),
      ]
    ])
    .oneTime(true));
    });

bot.command(phrase.hellomk.money, async (ctx) => {
      await ctx.reply(phrase.ans.obsh, null, Markup
      .keyboard([
        [
          Markup.button(phrase.money.when, 'positive'),
        ],
        [
          Markup.button(phrase.money.wait, 'positive'),
        ],
        [
          Markup.button(phrase.money.how_much, 'positive'),
        ]
      ])
      .oneTime(true))
    })

bot.command(phrase.money.when, async (ctx) => {
      await ctx.reply(phrase.moneyansw.when, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })    

bot.command(phrase.money.wait, async (ctx) => {
  let ms = Date.now();
  let date = new Date(ms);
  let text = "";
  if (date.getDate() < 25){
    text = phrase.moneyansw.wait
  } else{
    if (date.getDate() == 25){
      text = phrase.moneyansw.wait25
    } else{
      text = phrase.moneyansw.wait_after
    }
  }
      await ctx.reply(text, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true))
    })
    
    bot.command(phrase.money.how_much, async (ctx) => {
      await ctx.reply(phrase.moneyansw.how_much+db.leaders.kok.name+phrase.moneyansw.how_much2, null, Markup
      .keyboard([
        [
          Markup.button(phrase.start.anotherq, 'positive'),
        ]
      ])
      .oneTime(true)).then(()=>{
        bot.sendMessage(db.leaders.kok.id, 'vk.com/id'+ctx.message.from_id+' Вопрос: '+ctx.message.text)
      })
    })   


bot.command(phrase.hellomk.matpom, async (ctx) => {
  await ctx.reply(phrase.ans.matpom, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

bot.command(phrase.hellomk.iwanttoprof, async (ctx) => {
  await ctx.reply(phrase.ans.iwanttoprof, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

bot.command(phrase.hellomk.tonntu, async (ctx) => {
  await ctx.reply(phrase.ans.tonntu, null, Markup
    .keyboard([
      [
        Markup.button(phrase.start.anotherq, 'positive'),
      ]
    ])
    .oneTime(true))
  })

bot.command(phrase.hellomk.exchangeonnntu, async (ctx) => {
  await ctx.reply(phrase.ans.exchangeonnntu, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

bot.command(phrase.hellomk.exchangeintonntu , async (ctx) => {
  await ctx.reply(phrase.ans.exchangeintonntu, null, Markup
  .keyboard([
    [
      Markup.button(phrase.start.anotherq, 'positive'),
    ]
  ])
  .oneTime(true))
})

const session = new Session();

const stage = new Stage(active, qai, partnership, hostel);

bot.use(session.middleware());
bot.use(stage.middleware());

bot.command(phrase.hellomk.active, async (ctx) => {
  await ctx.scene.enter('active');
});

bot.command(phrase.hellomk.inst, async (ctx) => {
  await ctx.scene.enter('qai');
})

bot.command(phrase.hellomk.partnership, async (ctx)=>{
  await ctx.scene.enter('partnership')
})

bot.command(phrase.hellomk.obsh, async (ctx)=>{
  await ctx.scene.enter('hostel')
})

bot.on(async (ctx)=>{
  await ctx.reply('Не понимаю тебя, попробуй еще раз?', null, Markup
  .keyboard([
    [
      Markup.button( phrase.hellomk.matpom, 'primary'),
      Markup.button( phrase.hellomk.obsh, 'primary'),
      Markup.button( phrase.hellomk.money, 'primary'),
    ],
    [
      Markup.button( phrase.hellomk.inst, 'primary'),
      Markup.button( phrase.hellomk.tonntu, 'primary'),
    ],
    [
      Markup.button( phrase.hellomk.exchangeintonntu, 'primary'),
      Markup.button( phrase.hellomk.exchangeonnntu, 'primary'),
    ],
    [
      Markup.button( phrase.hellomk.active, 'positive'),
    ],
    [
      Markup.button( phrase.hellomk.iwanttoprof, 'positive'),
    ],
    [
      Markup.button(phrase.hellomk.partnership),
    ]
  ])
  .oneTime(true));
  });

bot.startPolling((err) => {
    if (err) {
      console.error(err);
    }
  });