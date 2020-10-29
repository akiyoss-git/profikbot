const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const db = require('../helpers/database')
const phrases = require('../phrases.json')

module.exports = new Scene('admin', 
async (ctx)=>{
    ctx.scene.next();
    await ctx.reply('Введите ключ администратора:')
},
async (ctx)=>{
    switch (ctx.message.text){
        case db.getAdminKey():{
            ctx.scene.next();
            await ctx.reply('[ADMIN] Что необходимо сделать?', null, Markup
            .keyboard([
                [
                    Markup.button('Сменить лидера')
                ],
                [
                    Markup.button('Сменить ключ администратора')
                ], 
                [
                    Markup.button('Выйти')
                ]
            ])
            .oneTime(true))
            break;
        }
        default:{
            ctx.scene.leave()
                await ctx.reply('Не могу понять, начните заново', null, Markup
                .keyboard([
                    [
                        Markup.button(phrases.start.to_start)
                    ]
                ]).oneTime(true))
                break;
        }
    }
    
},
async (ctx)=>{
    switch(ctx.message.text){
        case 'Сменить лидера':{
            ctx.scene.next();
            await ctx.reply('[ADMIN] Кого вы хотите сменить?', null, Markup
            .keyboard([
                [
                    Markup.button('ИТС', 'primary'),
                    Markup.button('ИЯЭиТФ', 'primary'),
                    Markup.button('ИПТМ', 'primary'),
                  ],
                  [
                    Markup.button('ИНЭУ', 'primary'),
                    Markup.button('ИРИТ', 'primary'),
                    Markup.button('ИНЭЛ', 'primary'),
                  ],
                  [
                    Markup.button('ИФХТиМ', 'primary'),
                    Markup.button('ИАО', 'primary'),
                    Markup.button('КОК', 'primary'),
                  ],
                  [
                    Markup.button('КМС', 'primary'),
                    Markup.button('ЖБК', 'primary'),
                  ],
            ]).oneTime(true)
            );
            ctx.session.admin='cleader';
            break;
        }
        case 'Сменить ключ администратора':{
            ctx.scene.next();
            await ctx.reply('[ADMIN] Введите новый ключ:')
            ctx.session.admin='ckey';
            break;
        }
        default:{
            ctx.scene.leave();
            ctx.reply('[ADMIN] Вы вышли из Админ-панели')
            break;
        }
    }
},
async (ctx)=>{
    switch(ctx.session.admin){
        case 'ckey':{
            await ctx.reply('[ADMIN] Ключ администратора успешно изменен', null, Markup
            .keyboard([
                [
                    Markup.button(phrases.start.to_start)
                ]
            ])
            .oneTime(true)).then(()=>{
                db.setAdminKey(ctx.message.text)
            })
            ctx.scene.leave()
            break;
        }
        case 'cleader':{
            switch (ctx.message.text){
                case 'ИТС':{
                    ctx.session.lfrom = 'its';
                    break;
                }
                case 'ИПТМ':{
                    ctx.session.lfrom = 'iptm';
                    break;
                }
                case 'ИРИТ':{
                    ctx.session.lfrom = 'irit';
                    break;
                }
                case 'ИФХТиМ':{
                    ctx.session.lfrom = 'ifhtim';
                    break;
                }
                case 'ИНЭЛ':{
                    ctx.session.lfrom = 'inel';
                    break;
                }
                case 'ИНЭУ':{
                    ctx.session.lfrom = 'ineu';
                    break;
                }
                case 'ИЯЭиТФ':{
                    ctx.session.lfrom = 'iyaeitf';
                    break;
                }
                case 'ИАО':{
                    ctx.session.lfrom = 'iao';
                    break;
                }
                case 'ЖБК':{
                    ctx.session.lfrom = 'zhbk';
                    break;
                }
                case 'КОК':{
                    ctx.session.lfrom = 'kok';
                    break;
                }
                case 'КМС':{
                    ctx.session.lfrom = 'kms';
                    break;
                }
                default:{
                    ctx.scene.leave()
                    await ctx.reply('Не могу понять, начните заново', null, Markup
                    .keyboard([
                        [
                            Markup.button(phrases.start.to_start)
                        ]
                    ]).oneTime(true))
                    break;
                }
            }
            ctx.scene.next();
            await ctx.reply('Введите имя председателя:')
        }
    }
},
async (ctx)=>{
    ctx.scene.next()
    ctx.session.name=ctx.message.text;
    await ctx.reply('Имя: '+ctx.message.text+'\nВсе верно?', null, Markup
    .keyboard([
        [
            Markup.button('Да', 'positive')
        ],
        [
            Markup.button('Нет', 'negative')
        ]
    ]).oneTime(true))
},
async (ctx)=>{
    switch(ctx.message.text){
        case 'Да':{
            await ctx.reply('Введите id страницы');
            ctx.scene.next()
            break;
        }
        default:{
            ctx.scene.leave();
            await ctx.reply('Попробуйте с начала', null, Markup
            .keyboard([
                [
                    Markup.button(phrases.start.to_start)
                ]
            ]))
            break;
        }
    }
},
async (ctx)=>{
    ctx.scene.next()
    ctx.session.id=ctx.message.text;
    await ctx.reply('id: vk.com/id'+ctx.message.text+'\nВсе верно?', null, Markup
    .keyboard([
        [
            Markup.button('Да', 'positive')
        ],
        [
            Markup.button('Нет', 'negative')
        ]
    ]).oneTime(true))
},
async (ctx)=>{
    switch(ctx.message.text){
        case 'Да':{
            await ctx.reply('Председеталь изменен на '+ctx.session.name+'\nvk.com/id'+ctx.session.id, null, Markup
            .keyboard([
                [
                    Markup.button(phrases.start.to_start)
                ]                
            ]).oneTime(true)).then(()=>{
                db.setLeader(ctx.session.lfrom, ctx.session.name, ctx.session.id);
            });
            ctx.scene.leave()
            break;
        }
        default:{
            ctx.scene.leave();
            await ctx.reply('Попробуйте с начала', null, Markup
            .keyboard([
                [
                    Markup.button(phrases.start.to_start)
                ]
            ]).oneTime(true))
            break;
        }
    }
},
)