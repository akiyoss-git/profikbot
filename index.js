const VkBot = require('node-vk-bot-api');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require("./db.json")
const phrase = require("./phrases.json")
 
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

    const hostel = new Scene('hostel', 
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

const active = new Scene('active',
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

const qai = new Scene('qai', 
async (ctx) => {
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
},
async (ctx) => {
  switch (ctx.message.text){
    case 'ИРИТ':
      {
        ctx.session.qai = phrase.qai.irit
        break;
      }
    case 'ИТС':
      {
        ctx.session.qai = phrase.qai.its
        break;
      }
    case 'ИНЭЛ':
      {
        ctx.session.qai = phrase.qai.inel
        break;
      }
    case 'ИНЭУ':
      {
        ctx.session.qai = phrase.qai.ineu
        break;
      }
    case 'ИФХТиМ':
      {
        ctx.session.qai = phrase.qai.ifhtim
        break;
      }
    case 'ИЯЭиТФ':
      {
        ctx.session.qai = phrase.qai.iyaeitf
        break;
      }
    case 'ИПТМ':
      {
        ctx.session.qai = phrase.qai.iptm
        break;
      }
    case phrase.start.to_start:
      {
        ctx.scene.leave();
        break;
      }
    default:
      {
        ctx.scene.leave();
        await ctx.reply('Не понимаю тебя', null, Markup
        .keyboard([
          [
            Markup.button(phrase.start.to_start)
          ]
        ]))
        break;
      }
  }
  ctx.scene.next()
  await ctx.reply('Что тебя интересует?', null, Markup
  .keyboard([
    [
      Markup.button(ctx.session.qai.questions.top1)
    ],
    [
      Markup.button(ctx.session.qai.questions.top2)
    ],
    [
      Markup.button(ctx.session.qai.questions.top3)
    ],
    [
      Markup.button(ctx.session.qai.questions.top4)
    ],
    [
      Markup.button(ctx.session.qai.questions.top5)
    ]
  ]))
},
async (ctx) =>{
  switch (ctx.message.text){
    case ctx.session.qai.questions.top1:
      {
        ctx.scene.leave();
        ctx.reply(ctx.session.qai.answers.top1, null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.to_start)
            ]
          ]))
          break;
      }
    case ctx.session.qai.questions.top2:
      {
        ctx.scene.leave();
        ctx.reply(ctx.session.qai.answers.top2, null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.to_start)
            ]
          ]))
          break;
      }
    case ctx.session.qai.questions.top3:
      {
        ctx.scene.leave();
        ctx.reply(ctx.session.qai.answers.top3, null, Markup
          .keyboard([
            [
              Markup.button(phrase.start.to_start)
            ]
          ]))
          break;
      }
      case ctx.session.qai.questions.top4:
        {
          ctx.scene.leave();
          ctx.reply(ctx.session.qai.answers.top4, null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.to_start)
              ]
            ]))
            break;
        }
        case ctx.session.qai.questions.top5:
          {
            ctx.scene.leave();
            ctx.reply(ctx.session.qai.answers.top5, null, Markup
              .keyboard([
                [
                  Markup.button(phrase.start.to_start)
                ]
              ]))
              break;
          }
        default:
          {
            ctx.scene.leave();
            await ctx.reply('Не понимаю тебя', null, Markup
            .keyboard([
              [
                Markup.button(phrase.start.to_start)
              ]
            ]))
            break;
          }
  }
}
)

const partnership = new Scene('partnership',
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