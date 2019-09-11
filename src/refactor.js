const {
	path,
	propOr,
	pipe,
	equals,
	when,
	always,
	__,
	call,
	pathSatisfies,
	compose,
	ifElse,
	type,
	converge,
	identity
} = require("ramda");

const isTruthy = pipe(
	Boolean,
	equals(true)
);

function styledBy(kayAddress, options) {
	const keyPath = kayAddress.split(".");

	switch (typeof options) {
		case "string":
			return when(pathSatisfies(isTruthy, keyPath), always(options));

		case "function":
			return when(pathSatisfies(isTruthy, keyPath), options);

		case "object":
			const targetValueOfOptions = compose(
				propOr(options._, __, options),
				path(keyPath)
			);
			return ifElse(
				compose(
					equals("Function"),
					type,
					targetValueOfOptions
				),
				converge(call, [targetValueOfOptions, identity]),
				targetValueOfOptions
			);

		default:
			return path(keyPath);
	}
}

module.exports = styledBy;
