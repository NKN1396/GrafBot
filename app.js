const tokens = require("./tokens.json")
process.env.TOKEN_DISCORD = tokens.Discord
process.env.TOKEN_YOUTUBE = tokens.YouTube
const channel_modlogs_id = "" //REMOVED

const Discord = require("discord.js-commando")
const handles = require("discord.js-handles")


const bot = new Discord.Client({
	commandPrefix : "!",
	unknownCommandResponse : false,
	owner: "" //REMOVED
})

bot.registry.registerDefaultGroups()
	.registerDefaultTypes()
	.registerDefaultCommands(
		{
			"help" : true,
			"prefix" : false,
			"eval_" : true,
			"ping" : false,
			"commandState" : false
		}
	)

require("./src/stream")(bot)
require("./src/listen")(bot, channel_modlogs_id)


const handlerOptions = {
	logAllGuilds: false,
	guilds: [
		"" //REMOVED
	],
	name: "grafbot",
	notify: {
		users: [],
		channels: [ "" ] //REMOVED
	}
}
handles(bot, handlerOptions)

bot.login(process.env.TOKEN_DISCORD)
