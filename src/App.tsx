import React, { useState, useEffect } from "react"
import history from "history/browser"

import {
	calcAverages,
	calcDeltaProbs,
	calcResultingProbs,
	filterRolls,
	formatPercentage,
	getNumberParam,
	getRollsFromQuery,
	range,
} from "./helpers"
import DeltaMeter from "./DeltaMeter"

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
						<input
							className="text-blueGray-800"
							type="number"
							min="1"
							max="5"
							name="dice-count"
							value={diceCount}
							onChange={(ev) => setDiceCount(parseInt(ev.target.value))}
						/>
					</label>
					<label>
						Min Dice Value
						<input
							className="text-blueGray-800"
							type="number"
							min="0"
							max={maxFace}
							name="dice-count"
							value={minFace}
							onChange={(ev) => setMinFace(parseInt(ev.target.value))}
						/>
					</label>
					<label>
						Max Dice Value
						<input
							className="text-blueGray-800"
							type="number"
							min={minFace}
							name="dice-count"
							value={maxFace}
							onChange={(ev) => setMaxFace(parseInt(ev.target.value))}
						/>
					</label>
				</div>
				<input
					type="button"
					value="Clear"
					className="text-blueGray-800"
					onClick={() => setRollCounts({})}
				/>
				{range(minRoll, maxRoll).map((face) => (
					<label className="tabular-nums flex flex-row gap-2" key={face}>
						<span className="w-8">{face}</span>
						<input
							className="text-blueGray-800 w-10"
							type="number"
							value={rollCounts[face] ?? 0}
							min="0"
							onChange={(ev) =>
								setRollCounts({
									...rollCounts,
									[face]: parseInt(ev.target.value),
								})
							}
						/>
						<DeltaMeter delta={deltaProbs[face]} middle={averageProbs[face]} />
						{formatPercentage(deltaProbs[face])} (
						{formatPercentage(resultingProbs[face] ?? 0, false)}
						{" / "}
						{formatPercentage(averageProbs[face] ?? 0, false)})
					</label>
				))}
			</div>
		</div>
	)
}

export default App
