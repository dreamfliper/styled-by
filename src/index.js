const path = (obj, address) =>
	address.reduce((result, key) => result && result[key], obj);

const mapOpt = {
	function: ({ options, props, prop }) =>
		options[path(props, prop.split("."))](props),
	string: ({ options, props, prop }) => options[path(props, prop.split("."))],
	object: ({ options, props, prop }) => options[path(props, prop.split("."))],
	undefined: ({ options, props }) =>
		typeof options._ === "function" ? options._(props) : null
};

const mapOptions = {
	string: ({ options }) => options,
	function: ({ options, props }) => options(props),
	object: ({ options, props, prop }) =>
		mapOpt[typeof options[path(props, prop.split("."))]]({
			options,
			props,
			prop
		}),
	undefined: () => {}
};

const styledProp = (prop, options) => props =>
	path(props, prop.split("."))
		? options
			? mapOptions[typeof options]({ prop, options, props })
			: path(props, prop.split("."))
		: "";

const styledOptions = (options, defaultProps = {}) => props =>
	Object.keys(options).reduce(
		(memo, prop) =>
			`${memo} ${styledProp(prop, options[prop])({
				...defaultProps,
				...props
			})}`,
		""
	);

const styledBy = (prop, options) =>
	typeof prop === "string"
		? styledProp(prop, options)
		: styledOptions(prop, options);

module.exports = styledBy;
