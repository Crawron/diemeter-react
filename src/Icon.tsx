import React from "react"

export default function Icon({ name }: { name: string }) {
	if (name === "backspace")
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fillRule="evenodd"
					d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
					clipRule="evenodd"
				/>
			</svg>
		)

	if (name === "die-6")
		return (
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="17" y="1" width="6" height="6" rx="3" />
				<rect x="17" y="17" width="6" height="6" rx="3" />
				<rect x="1" y="1" width="6" height="6" rx="3" />
				<rect x="1" y="9" width="6" height="6" rx="3" />
				<rect x="17" y="9" width="6" height="6" rx="3" />
				<rect x="1" y="17" width="6" height="6" rx="3" />
			</svg>
		)

	if (name === "die-5")
		return (
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="17" y="1" width="6" height="6" rx="3" />
				<rect x="17" y="17" width="6" height="6" rx="3" />
				<rect x="1" y="1" width="6" height="6" rx="3" />
				<rect x="9" y="9" width="6" height="6" rx="3" />
				<rect x="1" y="17" width="6" height="6" rx="3" />
			</svg>
		)

	if (name === "die-4")
		return (
			<svg
				className="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="17" y="1" width="6" height="6" rx="3" />
				<rect x="17" y="17" width="6" height="6" rx="3" />
				<rect x="1" y="1" width="6" height="6" rx="3" />
				<rect x="1" y="17" width="6" height="6" rx="3" />
			</svg>
		)

	if (name === "die-3")
		<svg
			className="w-6 h-6"
			fill="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="17" y="1" width="6" height="6" rx="3" />
			<rect x="9" y="9" width="6" height="6" rx="3" />
			<rect x="1" y="17" width="6" height="6" rx="3" />
		</svg>

	if (name === "die-2")
		<svg
			className="w-6 h-6"
			fill="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="17" y="1" width="6" height="6" rx="3" />
			<rect x="1" y="17" width="6" height="6" rx="3" />
		</svg>

	if (name === "die-1")
		<svg
			className="w-6 h-6"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect x="9" y="9" width="6" height="6" rx="3" />
		</svg>

	return (
		<svg
			className="w-6 h-6"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M6.72937 20.1061C7.31459 21.1008 8.32353 21.8358 9.55239 22.0304L17.4539 23.282C19.6358 23.6276 21.6848 22.139 22.0304 19.9571L23.282 12.0556C23.6276 9.87365 22.139 7.82467 19.9571 7.47905L19.5712 7.41792L20.1024 12.7421C20.4314 16.0395 18.0251 18.9792 14.7278 19.3082L6.7673 20.1025C6.75465 20.1037 6.74201 20.105 6.72937 20.1061Z" />
			<path
				fill-rule="evenodd"
				d="M1.39714 6.56877C1.1778 4.37054 2.78201 2.41073 4.98024 2.19139L12.9407 1.39712C15.1389 1.17779 17.0988 2.782 17.3181 4.98022L18.1124 12.9407C18.3317 15.1389 16.7275 17.0987 14.5293 17.3181L6.56878 18.1123C4.37056 18.3317 2.41074 16.7275 2.19141 14.5292L1.39714 6.56877ZM14.7548 5.75473C14.7548 6.8593 13.8593 7.75473 12.7548 7.75473C11.6502 7.75473 10.7548 6.8593 10.7548 5.75473C10.7548 4.65016 11.6502 3.75473 12.7548 3.75473C13.8593 3.75473 14.7548 4.65016 14.7548 5.75473ZM6.75476 15.7547C7.85933 15.7547 8.75476 14.8593 8.75476 13.7547C8.75476 12.6502 7.85933 11.7547 6.75476 11.7547C5.65019 11.7547 4.75476 12.6502 4.75476 13.7547C4.75476 14.8593 5.65019 15.7547 6.75476 15.7547Z"
			/>
		</svg>
	)
}
