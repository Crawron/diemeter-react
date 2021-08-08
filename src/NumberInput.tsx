import React, { useState, useRef, useEffect } from "react"

export default function NumberInput(props: {
	value: string | number
	min?: number
	max?: number
	onChange?: (newValue: number) => void
}) {
	const { min, max } = props
	const [value, setValue] = useState(props.value.toString())
	const [parsedValue, setParsedValue] = useState(parseInt(value))
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (props.onChange) props.onChange(parsedValue)
		setValue(parsedValue.toString())
	}, [parsedValue])

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		let newValue = parseInt(ev.target.value)
		setValue(ev.target.value)
		if (isFinite(newValue)) setParsedValue(newValue)
	}

	function bump(amount: number) {
		let newValue = parsedValue + amount

		if (min !== undefined && newValue < min) newValue = min
		if (max !== undefined && newValue > max) newValue = max
		if (!isFinite(newValue)) newValue = parsedValue

		setParsedValue(newValue)
	}

	// Handle Wheel event non-passively
	useEffect(() => {
		if (!inputRef.current) return

		const handler = (ev: WheelEvent) => {
			ev.preventDefault()
			bump(-Math.sign(ev.deltaY))
		}

		inputRef.current.addEventListener("wheel", handler)
		return () => {
			inputRef.current && inputRef.current.removeEventListener("wheel", handler)
		}
	})

	return (
		<input
			className="h-8 w-8 bg-blueGray-900 text-center tabular-nums rounded overflow-hidden font-medium"
			ref={inputRef}
			type="text"
			value={value}
			min={props.min}
			max={props.max}
			onChange={handleChange}
		/>
	)
}
