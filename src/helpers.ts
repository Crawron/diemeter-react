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

export function formatPercentage(num: number, includeSign = true) {
	num *= 100
	const sign = lit(includeSign, getSign(num))
	return `${sign}${Math.abs(num).toFixed(2)}%`
}

export function getSign(num: number) {
	return num > 0 ? "+" : num < 0 ? "-" : "±"
}

export function lit(condition: boolean, str: string) {
	return condition ? str : ""
}

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
