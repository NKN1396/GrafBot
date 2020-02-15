module.exports = function(client, channel){
	function send_embed_aliasChange(alias_old, alias_new, user){
		client.channels.get(channel).send(`📝 ${alias_old} (${user}) heißt jetzt ${alias_new}`
		)
	}
	
	client
		.on("guildMemberUpdate", (oldMember, newMember) => {
			if(oldMember.displayName == newMember.displayName) return
			console.log("MEMBER DISPLAYNAME CHANGED: " + newMember.user.id + " (" + oldMember.displayName + " to " + newMember.displayName + ")")
			send_embed_aliasChange(oldMember.displayName, newMember.displayName, newMember.user)
				.catch(console.error)
		})
		.on("userUpdate", (oldUser, newUser) => {
			if(oldUser.username == newUser.username) return //Only trigger if username changed
			console.log("USER NAME CHANGED: " + newUser.id + " ("+oldUser.username + " to " + newUser.username + ")")
			if(client.channels.get(channel).guild.members.get(newUser.id).nickname) return //Only trigger if user has no username
			send_embed_aliasChange(oldUser.username, newUser.username, newUser)
				.catch(console.error)
		})
}
