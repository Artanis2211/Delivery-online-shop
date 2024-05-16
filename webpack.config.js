const config = {
	mode: 'production',
	entry: {
		index: './src/js/index.js',
		// about: './src/js/about.js',
		// contacts: './src/js/contacts.js',
		// admin: './src/js/admin.js',
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
}

module.exports = config
