const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const phrase = require("../phrases.json")

module.exports = new Scene('qai', 
async (ctx) => {
  ctx.scene.next();
  await ctx.reply('С какого ты института?', 'photo139209737_457245265', Markup
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
        await ctx.reply('Не понимаю тебя', 'photo182885071_457244090', Markup
        .keyboard([
          [
            Markup.button(phrase.start.to_start)
          ]
        ]))
        break;
      }
  }
  ctx.scene.next()
  await ctx.reply('Что тебя интересует?', 'photo121545456_457264505', Markup
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
        ctx.reply(ctx.session.qai.answers.top1, 'photo182885071_457244092', Markup
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
        ctx.reply(ctx.session.qai.answers.top2, 'photo182885071_457244092', Markup
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
        ctx.reply(ctx.session.qai.answers.top3, 'photo182885071_457244092', Markup
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
          ctx.reply(ctx.session.qai.answers.top4, 'photo182885071_457244092', Markup
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
            ctx.reply(ctx.session.qai.answers.top5, 'photo182885071_457244092', Markup
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
            await ctx.reply('Не понимаю тебя', 'photo139209737_457245265', Markup
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