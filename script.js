require('dotenv').config(); 

const openaiApiKey = process.env.OPENAI_API_KEY;
const discordToken = process.env.DISCORD_BOT_TOKEN;

// Importando as bibliotecas necessarias
const {Client, GatewayIntentBits} = require('discord.js'); // Biblioteca para conectar com o discord
const axios = require('axios'); // Biblioteca para fazer requisicoes HTTP, acessando a API da OpenAI

// Criando o cliente do bot com as permissoes necessarias para interagir em chats de texto
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, // Gerenciar servidores
        GatewayIntentBits.GuildMessages, // Receber e enviar mensagens
        GatewayIntentBits.MessageContent // Ler o conteudo das mensagens
    ]
});

// Quando o bot ficar online, exibe uma mensagem no terminal 
client.once('ready', () => {
    console.log('Bot está online e pronto para uso!');
});

// Captando quando uma nova mensagem for enviada no servidor
client.on('messageCreate', async (message) => {
    // Verifica se a mensagem foi enviada por outro bot. Se for, ignoramos
    if (message.author.bot) return; 

    // Captamos o conteudo da mensagem enviada pelo usuario
    const userMessage = message.content; 

    //Verificar se a mensagem comeca com o comando !pergunta
    // Esse comando sera usado para respostas mais detalhadas (limite maior de tokens)
    if (userMessage.startsWith('!pergunta')) { 
        // Extrai o texto apos o comando !pergunta
        const pergunta = userMessage.replace('!pergunta', '').trim(); 

        try { 
            // Chamada a API da OpenAI, passando a pergunta e pedindo uma resposta mais longa
            const respostaIA = await axios.post('https://api.openai.com/v1/completions', {
                model: 'text-davinci-003', // Modelo de IA
                prompt: pergunta, // Pergunta do usuario
                max_tokens: 50 // Limite menor de tokens, para respostas mais curtas 
            }, {
                headers: { 
                    'Authorization': `Bearer ${openaiApiKey}`,
                    'Contet-Type': 'application/json' 
                }
            });

            
        }
    }
});