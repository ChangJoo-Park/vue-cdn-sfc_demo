// ----------------------------------------------------------------------
// WEBPACK CONFIGURATION
// ----------------------------------------------------------------------

// INSTRUCTIONS
// webpack --env.file="./path/to/file" --relative to the src folder

// Import dependencies
const path                = require('path');
const webpack             = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const VueLoaderPlugin     = require('vue-loader/lib/plugin');

function resolve(dir) {
	return path.resolve(__dirname, dir);
}

module.exports = (env) => {
  console.log('webpack started')
	const filename = 'example.vue'
  const distpath = path.join(__dirname, 'dist')
	return {
		watch : true,
		mode : 'production',
		entry : {
			[filename] : './entry.js'
		},
		output : {
			filename : '[name].js',
			path : distpath
		},
		resolve : {
			extensions : ['.vue', '.js'],
			alias : {
				'vue$' : resolve('node_modules/vue/dist/vue.min.js'),
				'@'    : resolve('src')
			}
		},
		externals : {
			vue : 'Vue',
			lodash : 'lodash'
		},
		module : {
			rules : [
				{
					test : /\.vue$/,
					loader : 'vue-loader'
				},
				{
					test : /\.js$/,
					loader : 'babel-loader',
					include : [
						resolve('src')
					],
					exclude: file => (
						/node_modules/.test(file) &&
						!/\.vue\.js/.test(file)
					)
				}
			]
		},
		plugins : [
			new VueLoaderPlugin(),
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('DonePlugin', (stats) => {
            console.log('Done.')
            setTimeout(() => {
              process.exit(0)
            })
          });
        }
     }
		]
	};
};