import test from 'ava'
import styledBy from '.'

const props = {
	margin: true,
	padding: '10px',
	size: 'small',
	corner: 'rounded',
	blocked: true
}

test('passed props', t => {
	const result = styledBy('padding')(props)
	t.is(result, '10px')
})

test('string', t => {
	const padding = styledBy('padding', '15px')(props)
	const margin = styledBy('margin', '25px')(props)

	t.is(padding, '15px')
	t.is(margin, '25px')
})

test('function', t => {
	const padding = styledBy('padding', props => props.padding)(props)

	t.is(padding, '10px')
})

test('object with string', t => {
	const options = {
		small: 'font-size: 0.8rem;',
		medium: 'font-size: 1rem;',
		large: 'font-size: 1.2rem;'
	}

	const size = styledBy('size', options)(props)

	t.is(size, options[props.size])
})

test('object with function', t => {
	const options = {
		default: props => props.blocked ? 'default blocked' : 'default unblocked',
		rounded: props => props.blocked ? 'rounded blocked' : 'rounded unblocked',
		circle: props => props.blocked ? 'circle blocked' : 'circle unblocked'
	}

	const corner = styledBy('corner', options)(props)

	t.is(corner, options[props.corner](props))
})