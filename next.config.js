const withStylus = require('@zeit/next-stylus');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(withStylus({
	webpack: function (config) {
		config.module.rules.push({
			test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 100000,
					name: '[name].[ext]'
				}
			}
		})
		return config
	},
	dir: './style',
	webpackDevMiddleware: (config) => {
		// Solve compiling problem via vagrant
		config.watchOptions = {
			poll: 1000,   // Check for changes every second
			aggregateTimeout: 300,   // delay before rebuilding
		};
		return config;
	}

}));

