const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Replit: Listening on port ${PORT}`);
});




const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Read all quotes from the file
// Read paragraphs between triple brackets
const urgesRaw = fs.readFileSync("urge_quotes.txt", "utf8");
const urges = urgesRaw.split(/\[\[\[(.*?)\]\]\]/gs)
                      .map(text => text.trim())
                      .filter(Boolean);

client.on("messageCreate", async message => {
  if (message.content === ".urge") {
    const text = urges[Math.floor(Math.random() * urges.length)];
    const attachmentPath = "null"; // Replace with your video/image file name or null

    if (fs.existsSync(attachmentPath)) {
      await message.channel.send({ content: text, files: [attachmentPath] });
    } else {
      await message.channel.send(text);
    }
  }
});

client.login(process.env.TOKEN);
