const answers = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!'
];


module.exports.run = async (client, message, args) => {

		message.reply(args.join(' ').endsWith('?') ?
			`${answers[Math.floor(Math.random() * answers.length)]}` :
			'Seems like your missing a "?"');
}


module.exports.config = {
	name: "8ball",
	aliases: ["8b", "ask"],
	category: "Misc",
	usage: "*8ball 'question here'?",
	description: "Sends a answer to your question"
}
