const { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const os = require('os');
const pidusage = require('pidusage');
require('ms');
module.exports = {
  name: "stats",
  description: "Check statistics of the bot.",
  usage: "",
  category: "info",
  userPerms: [""],
  botPerms: [""],
  cooldown: 10,
  guildOnly: false,
  ownerOnly: false,
  toggleOff: false,
  nsfwOnly: false,
  maintenance: false,
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    try {
      let days = Math.floor(client.uptime / 86400000)
      let hours = Math.floor(client.uptime / 3600000) % 24
      let minutes = Math.floor(client.uptime / 60000) % 60
      let seconds = Math.floor(client.uptime / 1000) % 60
      let webLatency = new Date() - interaction.createdAt
      let apiLatency = client.ws.ping
      let totalLatency = webLatency + apiLatency
      let emLatency = {
        Green: '🟢',
        Yellow: '🟡',
        Red: '🔴'
      }
      let totalUsers = 0;

        client.guilds.cache.forEach((guild) => {
            totalUsers += guild.memberCount;
        });
    
      const usage = await pidusage(process.pid);
      const cpuUsage = usage.cpu;

      // Buttons
      const a = new ButtonBuilder()
      .setEmoji(`🆘`)
      .setURL('https://discord.gg/wAp6Wr2emN')
      .setStyle(ButtonStyle.Link);

      const b = new ButtonBuilder()
      .setEmoji(`📨`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
      .setStyle(ButtonStyle.Link);

      const c = new ButtonBuilder()
      .setEmoji(`<:youtube:1137646484318326845>`)
      .setURL('https://youtube.com/@NitrixEXE')
      .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
			.addComponents(a, b, c);
    
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(totalLatency < 200 ? client.embed.successcolor : totalLatency < 500 ? client.embed.stanbycolor : client.embed.wrongcolor)
            .setTitle(`Returns Latency And API Ping`)
            .setImage(`https://cdn.discordapp.com/attachments/1135127619835273308/1142878799130787981/chart.png`)
            .setFields([
              {
                name: `📡 Websocket Latency`,
                value: `>>> \`\`\`yml\n${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red} ${webLatency}ms\`\`\``,
                inline: true
              },
              {
                name: `🛰 API Latency`,
                value: `>>> \`\`\`yml\n${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red} ${apiLatency}ms\`\`\``,
                inline: true
              },
              {
                name: `📊 Server`,
                value: `>>> \`\`\`yml\n${client.guilds.cache.size}\`\`\``,
                inline: true
              },
              {
                name: `👥 Users`,
                value: `>>> \`\`\`yml\n${totalUsers}\`\`\``,
                inline: true
              },
              {
                name: `🧾 Projects`,
                value: `>>> \`\`\`yml\n${client.projectsSize}\`\`\``,
                inline: true
              },
              {
                name: `🪣 Database`,
                value: `>>> \`\`\`yml\n🟢 CONNECTED\`\`\``,
                inline: true
              },
              {
                name: `⏲ Uptime`,
                value: `>>> \`\`\`m\n${days} D : ${hours} H : ${minutes} M\`\`\``,
                inline: true
              },
              {
                name: `💾 CPU Usage`,
                value: `>>> \`\`\`yml\n${cpuUsage.toFixed(2)}%\`\`\``,
                inline: true
              }
            ])],
            components: [row],
      })
    } catch (error) {
      client.slash_err(client, interaction, error);
    }
  }
};