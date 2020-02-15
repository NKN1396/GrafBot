module.exports = function(client, channel){
	client
		.on("guildMemberRemove", (guildMember)=>{
			client.channels.get(channel).send(
				`📤 ${guildMember.displayName} (${guildMember}) hat den Server verlassen.`
			)
				.catch(console.error)
			console.log("MEMBER JOINED: " + guildMember.user.id + " (" + guildMember.displayName + ")");
		})
}
