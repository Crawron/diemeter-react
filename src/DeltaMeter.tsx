import React from "react"
import { getDeltaColor, signedRoot } from "./helpers"

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
	const negScale = delta > 0 ? -0.5 : signedRoot(delta / negBound)
	const posScale = delta < 0 ? -0.5 : signedRoot(delta / posBound)

	return (
		<div className="flex flex-row flex-1 gap-0.5 h-8 w-full rounded overflow-hidden">
			<div
				className="bg-slate-600 h-full overflow-hidden"
				style={{ width: `${middle * 100}%` }}
			>
				<div
					className="h-full w-full transform origin-right transition"
					style={{
						backgroundColor: getDeltaColor(delta, negBound / 3),
						transform: `scaleX(${negScale})`,
					}}
				/>
			</div>
			<div
				className="bg-slate-600 h-full overflow-hidden"
				style={{ width: `${(1 - middle) * 100}%` }}
			>
				<div
					className="h-full w-full transform origin-left transition"
					style={{
						backgroundColor: getDeltaColor(delta, posBound / 12),
						transform: `scaleX(${posScale})`,
					}}
				/>
			</div>
		</div>
	)
}
