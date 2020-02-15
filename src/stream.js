const request = require("request")

const token = process.env.TOKEN_YOUTUBE
const discord_channelId = "" //REMOVED
const youtube_channelId = "" //REMOVED

const moment = require("moment")

var message_old
var message

module.exports = function(client){
	setInterval(
		fetchStream(client),
		60000
	)
}

function fetchStream(client) {
	request(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtube_channelId}&eventType=live&maxResults=1&type=video&key=${token}`, { json: true }, (err, res, body) => {
		if(err) return console.error(err)
		if(body.items.length > 0){
			announce(body.items[0], client)
			return
		}
		unannounce()
	})
}

function announce(item, client) {
	//Status: Live
	let out = `__${"" /* REMOVED */} ist jetzt **LIVE**!__`
	let embed = {
		"embed" : {
			"title": item.snippet.title,
			"url": `https://www.youtube.com/watch?v=${item.id.videoId}`,
			"image": {
				"url": item.snippet.thumbnails.high.url
			},
			"timestamp": moment().toISOString(),
			"description": item.snippet.description,
			"color": 0xff0000,
			"footer": {
				"text": "Nachricht aktualisiert im Minutentakt"
			}
		}
	}
	//Edit message if it already exists
	if(message){
		message.edit(out, embed)
			.catch(console.error)
		return
	} 
	//Create new message if none exists yet
	client.channels.get(discord_channelId).send(out, embed).then(msg => {
		message = msg
		if(!message_old) return
		message_old.delete()
			.catch(console.error)
	})
}

function unannounce() {
	//Status: down
	if(!message) return
	//Announce that stream is over
	message.edit(`Leider ist der Stream schon vorbei. - Vielleicht beim nächsten mal ${"<:REMOVED:REMOVED>" /* REMOVED */}`, {"embed" : null})
		.then(()=>{
			message_old = message
			message = undefined
		})
}
