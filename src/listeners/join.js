module.exports = function(client, channel){
	client
		.on("guildMemberAdd", (guildMember)=>{
			client.channels.get(channel).send(
				`📥 ${guildMember.displayName} (${guildMember}) ist dem Server beigetreten.`
			)
				.catch(console.error)
			console.log("MEMBER JOINED: " + guildMember.user.id + " (" + guildMember.displayName + ")")
		})
}
