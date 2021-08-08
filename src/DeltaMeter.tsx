import React from "react"
import { signedRoot } from "./helpers"

export default function DeltaMeter({
	delta,
	negBound = -1,
	posBound = 1,
	middle = 0.5,
}: {
	delta: number
	negBound?: number
	posBound?: number
	middle?: number
}) {
	const negScale = signedRoot(delta / negBound)
	const posScale = signedRoot(delta / posBound)

	return (
		<div className="flex flex-row gap-0.5 h-8 w-full max-w-xs rounded overflow-hidden ">
			<div
				className="bg-blueGray-600 h-full overflow-hidden"
				style={{ width: `${middle * 100}%` }}
			>
				<div
					className="bg-red-500 h-full w-full transform origin-right transition"
					style={{ transform: `scaleX(${negScale})` }}
				/>
			</div>
			<div
				className="bg-blueGray-600 h-full overflow-hidden"
				style={{ width: `${(1 - middle) * 100}%` }}
			>
				<div
					className="bg-green-500 h-full w-full transform origin-left transition"
					style={{ transform: `scaleX(${posScale})` }}
				/>
			</div>
		</div>
	)
}
