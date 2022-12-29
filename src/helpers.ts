export function range(min: number, max: number) {
	const array = []
	for (let i = min; i <= max; i++) array.push(i)
	return array
}

export function calcAverages(
	diceCount: number,
	minValue: number = 1,
	maxValue: number = 6
): Record<number, number> {
	const rollCounts: Record<number, number> = {}

	const dice = new Array<number>(diceCount).fill(minValue)
	const faceCount = maxValue - minValue + 1

	const sum = (arr: number[]) => arr.reduce((p, c) => p + c, 0)
	let roll = sum(dice)

	const totalPermutations = Math.pow(faceCount, diceCount)

	for (let i = 0; i < totalPermutations; i++) {
		rollCounts[roll] = (rollCounts[roll] ?? 0) + 1

		// Increment
		for (let i = 0; i < dice.length; i++) {
			dice[i] = ((dice[i] - minValue + 1) % faceCount) + minValue
			if (dice[i] !== minValue) break
		}

		roll = sum(dice)
	}

	for (const [roll, count] of Object.entries(rollCounts)) {
		rollCounts[Number(roll)] = count / totalPermutations
	}

	return rollCounts
}

export const formatPercent = (num: number) =>
	Math.abs(num * 100).toFixed(2) + "%"

export const formatSign = (num: number) => (num > 0 ? "+" : num < 0 ? "-" : "±")

export function calcResultingProbs(rolls: Record<number, number>) {
	const sum = Object.entries(rolls)
		.map(([k, v]) => [parseInt(k), v])
		.reduce((s, [_, c]) => s + c, 0)

	if (sum === 0) return {}
	return Object.fromEntries(Object.entries(rolls).map(([f, c]) => [f, c / sum]))
}

export function filterRolls(
	rolls: Record<number, number>,
	min: number,
	max: number
): Record<number, number> {
	return Object.fromEntries(
		Object.entries(rolls)
			.map<[number, number]>(([k, v]) => [parseInt(k), v])
			.filter(([f]) => f >= min && f <= max)
	)
}

export function calcDeltaProbs(
	results: Record<number, number>,
	average: Record<number, number>
) {
	return Object.fromEntries(
		Object.entries(average).map(([k, v]) => [k, (results[Number(k)] ?? 0) - v])
	)
}

export function getRollsFromQuery(): Record<number, number> {
	/* https://stackoverflow.com/a/901144 */
	const urlSearchParams = new URLSearchParams(window.location.search)
	return Object.fromEntries(
		[...urlSearchParams.entries()]
			.map(([k, v]) => [parseInt(k), parseInt(v)] as [number, number])
			.filter(([k, v]) => isFinite(k) && isFinite(v))
	)
}

export function getNumberParam(key: string) {
	const urlSearchParams = new URLSearchParams(window.location.search)
	const value = parseInt(urlSearchParams.get(key) ?? "")

	if (!isFinite(value)) return undefined
	else return value
}

export function signedRoot(num: number) {
	return Math.sqrt(Math.abs(num)) * Math.sign(num)
}

export function cap(num: number, min: number, max: number) {
	return Math.min(Math.max(num, min), max)
}

export function getDeltaColor(delta: number, bound = 0.15) {
	const white = "#EEEEEE"
	const redColors = ["#F8D3CF", "#FFB7B0", "#FF9B94", "#FF7D77", "#FF595A"]
	const greenColors = ["#D8EAC7", "#C0E5A0", "#A6E178", "#89DB4D", "#66D500"]

	const palette = delta > 0 ? greenColors : redColors
	if (delta === 0) return white

	return palette[
		Math.floor(
			cap(
				Math.abs(delta / bound) * palette.length,
				0,
				palette.length - 0.00000001
			)
		)
	]
}
