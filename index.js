import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

// Node 18+ (Render uses Node 18+ / 25)
// fetch is BUILT-IN → no node-fetch needed

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  console.log(
    "GOT:",
    message.guild?.name,
    "|",
    message.channel.name,
    "|",
    message.content
  );

  try {
    const res = await fetch("http://localhost:5678/webhook/discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message.content,
        user: message.author.username,
        channel: message.channel.name
      })
    });

    console.log("➡️ n8n status:", res.status);
  } catch (err) {
    console.error("❌ n8n error:", err.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
