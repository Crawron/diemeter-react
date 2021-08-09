import React, { useRef, useEffect } from "react"

export default function NumberInput(props: {
	value: string | number
	min?: number
	max?: number
	onChange?: (newValue: string) => void
}) {
	const { min, max } = props
	const value = String(props.value)
	const inputRef = useRef<HTMLInputElement>(null)

	function maybeClamp(value: number) {
		if (min !== undefined && value < min) return min
		if (max !== undefined && value > max) return max
		return value
	}

	function bump(amount: number) {
		let newValue = parseInt(value) + amount

		if (!isFinite(newValue))
			if (amount < 0 && max) newValue = max
			else if (amount > 0 && min) newValue = min
			else newValue = 0

		newValue = maybeClamp(newValue)

		if (props.onChange) props.onChange(newValue.toString())
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

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
		if (ev.target.value === "") ev.target.value = maybeClamp(0).toString()
		if (props.onChange) props.onChange(ev.target.value)
	}

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
