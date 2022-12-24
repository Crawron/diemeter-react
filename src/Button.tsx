import React from "react"
import Icon from "./Icon"

export default function Button(props: {
	text?: string
	icon?: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
	const xSizing = props.text ? "pr-3" + (props.icon ? " pl-2" : " pl-3") : "w-8"

	return (
		<button
			className={`h-8 ${xSizing} grid grid-flow-col gap-1 place-items-center rounded transition-colors bg-slate-600 hover:bg-slate-500 active:bg-slate-700 cursor-pointer font-medium`}
			onClick={props.onClick}
		>
			{props.icon && <Icon name={props.icon} />}
			{props.text}
		</button>
	)
}
