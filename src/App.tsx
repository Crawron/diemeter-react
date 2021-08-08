import React, { useState, useEffect } from "react"
import history from "history/browser"

import {
	calcAverages,
	calcDeltaProbs,
	calcResultingProbs,
	filterRolls,
	formatPercentage,
	getDeltaColor,
	getNumberParam,
	getRollsFromQuery,
	getSign,
	range,
} from "./helpers"
import DeltaMeter from "./DeltaMeter"
import Button from "./Button"
import NumberInput from "./NumberInput"

function App() {
	const [diceCount, setDiceCount] = useState(getNumberParam("count") ?? 2)
	const [minFace, setMinFace] = useState(getNumberParam("min") ?? 1)
	const [maxFace, setMaxFace] = useState(getNumberParam("max") ?? 6)

	const [rollCounts, setRollCounts] = useState(getRollsFromQuery())

	useEffect(() => {
		const { origin, pathname } = window.location

		const params = new URLSearchParams()
		if (diceCount !== 2) params.set("count", diceCount.toString())
		if (minFace !== 1) params.set("min", minFace.toString())
		if (maxFace !== 6) params.set("max", maxFace.toString())

		const rolls = Object.entries(filterRolls(rollCounts, minRoll, maxRoll))
		for (const [face, count] of rolls)
			if (count > 0) params.set(face, count.toString())

		const paramsString = params.toString()
		const url = `${origin}${pathname}?${paramsString}`

		history.replace(url)
	})

	const minRoll = diceCount * minFace
	const maxRoll = diceCount * maxFace

	const averageProbs = calcAverages(diceCount, minFace, maxFace)

	const resultingProbs = calcResultingProbs(
		filterRolls(rollCounts, minRoll, maxRoll)
	)
	const deltaProbs = calcDeltaProbs(resultingProbs, averageProbs)

	return (
		<div className="App">
			<div className="w-full max-w-2xl mx-auto">
				<div className="flex flex-col">
					<label>
						Dice Count
						<NumberInput
							value={diceCount}
							min={1}
							max={5}
							onChange={(val) => setDiceCount(val)}
						/>
					</label>
					<label>
						Min Dice Value
						<NumberInput
							min={0}
							max={maxFace}
							value={minFace}
							onChange={(val) => setMinFace(val)}
						/>
					</label>
					<label>
						Max Dice Value
						<NumberInput
							min={minFace}
							value={maxFace}
							onChange={(val) => setMaxFace(val)}
						/>
					</label>
				</div>
				<Button icon="backspace" onClick={() => setRollCounts({})} />

				{range(minRoll, maxRoll).map((face) => (
					<div className="flex flex-row gap-2" key={face}>
						<div className="w-8 h-8">{face}</div>
						<NumberInput
							value={rollCounts[face] ?? 0}
							min={0}
							onChange={(val) =>
								setRollCounts({
									...rollCounts,
									[face]: val,
								})
							}
						/>
						<DeltaMeter
							delta={deltaProbs[face]}
							negBound={-averageProbs[face]}
							posBound={1 - averageProbs[face]}
							middle={Math.min(1 / (maxFace - minFace), 0.5)}
						/>{" "}
						<Percentage value={deltaProbs[face]} />
					</div>
				))}
			</div>
		</div>
	)
}

function Percentage({ value }: { value: number }) {
	return (
		<div
			className="w-24 h-8 flex flex-row font-bold tabular-nums"
			style={{ color: getDeltaColor(value) }}
		>
			<span className="inline-block w-2 text-center">{getSign(value)}</span>
			<span className="inline-block w-20 text-right">
				{formatPercentage(value, false)}
			</span>
		</div>
	)
}

export default App
