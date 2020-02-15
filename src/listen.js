module.exports = function (client, channel) {
	require("./listeners/join")(client, channel)
	require("./listeners/leave")(client, channel)
	require("./listeners/rename")(client, channel)
}
