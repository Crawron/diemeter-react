import React, { useState, useEffect } from "react"
import history from "history/browser"
import { Action } from "history"

import {
	calcAverages,
	calcDeltaProbs,
	calcResultingProbs,
	filterRolls,
	formatPercent,
	getDeltaColor,
	getNumberParam,
	getRollsFromQuery,
	formatSign,
	range,
	calcAbsurdity,
} from "./helpers"
import DeltaMeter from "./DeltaMeter"
import Button from "./Button"
import NumberInput from "./NumberInput"
import Icon from "./Icon"

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

	history.listen(() => {
		if (history.action === Action.Pop)
			window.location.href = window.location.href
	})

	const minRoll = diceCount * minFace
	const maxRoll = diceCount * maxFace

	const averageProbs = calcAverages(diceCount, minFace, maxFace)

	const resultingProbs = calcResultingProbs(
		filterRolls(rollCounts, minRoll, maxRoll)
	)
	const deltaProbs = calcDeltaProbs(resultingProbs, averageProbs)

	const rollTotal = Object.values(
		filterRolls(rollCounts, minRoll, maxRoll)
	).reduce((a, b) => a + b, 0)

	function increaseRoll(face: number, amount = 1) {
		setRollCounts({
			...rollCounts,
			[face]: (rollCounts[face] ?? 0) + 1,
		})
	}

	return (
		<div className="App">
			<div className="w-full max-w-3xl px-4 py-20 mx-auto min-w-max">
				<div className="flex flex-col gap-2 mb-8">
					<div className="flex flex-row gap-2">
						<div className="grid w-8 h-8 place-items-center">
							<Icon name="dice" />
						</div>

						<NumberInput
							value={diceCount}
							min={1}
							max={5}
							onChange={(val) => {
								const dice = parseInt(val)
								if (isFinite(dice)) setDiceCount(dice)
							}}
						/>
					</div>
					<div className="flex flex-row gap-2">
						<div className="grid w-8 h-8 place-items-center">
							<Icon name="dice" />
						</div>

						<NumberInput
							min={0}
							max={maxFace - 1}
							value={minFace}
							onChange={(val) => {
								const min = parseInt(val)
								if (isFinite(min)) setMinFace(min)
							}}
						/>
						<div className="grid w-8 h-8 place-items-center">
							<Icon name="arrow-right" />
						</div>
						<NumberInput
							min={minFace + 1}
							value={maxFace}
							onChange={(val) => {
								const max = parseInt(val)
								if (isFinite(max)) setMaxFace(max)
							}}
						/>
					</div>
					<div>
						<Button
							icon="backspace"
							text="Clear Rolls"
							onClick={() => {
								history.push(window.location.toString())
								setRollCounts({})
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					{range(minRoll, maxRoll).map((face) => (
						<div className="flex flex-row gap-2" key={face}>
							<RollLabel label={face.toString()} />
							<NumberInput
								value={rollCounts[face] ?? 0}
								min={0}
								onChange={(val) => {
									const roll = parseInt(val)
									if (isFinite(roll))
										setRollCounts({
											...rollCounts,
											[face]: roll,
										})
								}}
							/>
							<DeltaMeter
								delta={deltaProbs[face]}
								negBound={-averageProbs[face]}
								posBound={1 - averageProbs[face]}
								middle={Math.min(1 / (maxFace - minFace), 0.5)}
							/>
							<Percentage value={deltaProbs[face]} />
							<span className="w-16 font-semibold text-right text-green-500">
								{(
									range(0, rollTotal)
										.map((i) => calcAbsurdity(i, rollTotal))
										.slice(0, rollCounts[face] + 1)
										.reduce((a, b) => a + b, 0) * 100
								).toFixed(2)}
								%
							</span>
							<span className="w-16 font-semibold text-right text-red-500">
								{(
									range(1, rollTotal)
										.map((i) => calcAbsurdity(i, rollTotal))
										.slice(rollCounts[face] + 1)
										.reduce((a, b) => a + b, 0) * 100
								).toFixed(2)}
								%
							</span>
						</div>
					))}
					<p className="italic text-opacity-75">{rollTotal} rolls</p>
					<input
						className="bg-slate-800"
						type="text"
						onKeyDown={(ev) => {
							const face = Number(ev.key)
							if (!Number.isFinite(face)) return
							if (face > maxRoll || face < minRoll) return

							increaseRoll(face)
						}}
					/>
				</div>
			</div>
		</div>
	)
}

function Percentage({ value }: { value: number }) {
	return (
		<div
			className="flex flex-row h-8 font-bold place-items-center tabular-nums"
			style={{ color: getDeltaColor(value) }}
		>
			<span className="w-2 text-center">{formatSign(value)}</span>
			<span className="w-20 text-right">{formatPercent(value)}</span>
		</div>
	)
}

function RollLabel({ label }: { label: string }) {
	return (
		<div className="grid w-8 h-8 font-bold rounded select-none place-items-center bg-slate-300 text-slate-700">
			{label}
		</div>
	)
}

export default App
