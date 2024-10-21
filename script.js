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

