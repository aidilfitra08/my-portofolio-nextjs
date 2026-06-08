"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faPalette,
	faRotateRight,
	faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { loadPortfolioData } from "@/lib/portfolio";
import {
	BINGO_THEMES,
	buildBingoBoard,
	getWinningLine,
} from "@/lib/bingo";

type BingoData = {
	title?: string;
	subtitle?: string;
	defaultThemeId?: string;
	texts?: string[];
};

const THEME_STYLES: Record<string, any> = {
	"retro-terminal": {
		page: "bg-[#f5f1e8] text-[#2a2a2a] dark:bg-[#0d0d0d] dark:text-[#e0e0e0]",
		frame:
			"vintage-card border-2 border-[#2a2a2a] border-opacity-20 dark:border-accent-green dark:border-opacity-20 bg-[#faf8f3] dark:bg-[#1a1a1a]",
		panel:
			"border-2 border-[#2a2a2a] border-opacity-20 dark:border-accent-green dark:border-opacity-20 bg-[#fffdf8] dark:bg-[#0a0a0a]",
		tile:
			"border-2 border-[#2a2a2a] border-opacity-15 dark:border-accent-green/20 bg-white dark:bg-[#0f0f0f] text-[#2a2a2a] dark:text-[#e0e0e0]",
		tileHover:
			"hover:border-accent-green hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_6px_18px_rgba(0,255,65,0.08)]",
		tileMarked:
			"bg-accent-green/10 text-[#0d0d0d] border-accent-green shadow-[0_0_0_2px_rgba(0,255,65,0.2)]",
		tileWinning:
			"ring-2 ring-[#ffb000] ring-offset-2 ring-offset-[#f5f1e8] dark:ring-offset-[#0d0d0d]",
		accent: "text-accent-green",
		muted: "text-[#6b6b6b] dark:text-[#a0a0a0]",
		overlay: "bg-[#0d0d0d]/88",
		badge: "bg-accent-green/15 text-accent-green",
	},
};

const EMPTY_MARKED = Array.from({ length: 25 }, () => false);
const MARKED_CIRCLE_IMAGE = "/data/assets/red-circle.png";

export default function BingoGamePage() {
	const [portfolio, setPortfolio] = useState<{ bingo?: BingoData } | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedThemeId, setSelectedThemeId] = useState(
		BINGO_THEMES[0].id
	);
	const [board, setBoard] = useState<string[]>([]);
	const [marked, setMarked] = useState<boolean[]>(EMPTY_MARKED);
	const [winningLine, setWinningLine] = useState<number[] | null>(null);
	const [hasBingo, setHasBingo] = useState(false);

	const bingoConfig = portfolio?.bingo;
	const activeTheme =
		BINGO_THEMES.find((theme) => theme.id === selectedThemeId) ??
		BINGO_THEMES[0];
	const theme =
		THEME_STYLES[activeTheme.id] ?? THEME_STYLES[BINGO_THEMES[0].id];
	const markedCount = marked.filter(Boolean).length;

	useEffect(() => {
		let isMounted = true;

		const loadData = async () => {
			const data = await loadPortfolioData();

			if (!isMounted) {
				return;
			}

			setPortfolio(data);
			setSelectedThemeId(data?.bingo?.defaultThemeId || BINGO_THEMES[0].id);
			setIsLoading(false);
		};

		loadData();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (!bingoConfig?.texts) {
			return;
		}

		setBoard(buildBingoBoard(bingoConfig.texts));
		setMarked(EMPTY_MARKED);
		setWinningLine(null);
		setHasBingo(false);
	}, [bingoConfig?.texts]);

	const handleTileClick = (index: number) => {
		if (hasBingo) {
			return;
		}

		setMarked((current) => {
			const next = [...current];
			next[index] = !next[index];

			const line = getWinningLine(next);
			setWinningLine(line);
			setHasBingo(Boolean(line));

			return next;
		});
	};

	const handlePlayAgain = () => {
		const texts = bingoConfig?.texts || [];

		setBoard(buildBingoBoard(texts));
		setMarked(EMPTY_MARKED);
		setWinningLine(null);
		setHasBingo(false);
	};

	if (isLoading) {
		return (
			<div
				className={`min-h-screen ${theme.page} flex items-center justify-center font-mono`}
			>
				<div className="text-center space-y-3">
					<div className={`text-4xl ${theme.accent} animate-spin`}>⟳</div>
					<p className={theme.muted}>Loading bingo board...</p>
				</div>
			</div>
		);
	}

	return (
		<main className={`min-h-screen ${theme.page} font-mono`}>
			<div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
				<div className="absolute inset-0 pointer-events-none opacity-[0.03]">
					<div className="absolute inset-0 bg-linear-to-b from-transparent via-black to-transparent animate-pulse" />
				</div>

				<section className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
					<div className="space-y-4">
						<p className={`text-sm uppercase tracking-[0.35em] ${theme.accent}`}>
							Bingo Game
						</p>
						<h1 className="text-4xl font-bold leading-tight sm:text-5xl">
							{bingoConfig?.title || "Playground Bingo"}
						</h1>
						<p className={`max-w-2xl text-sm sm:text-base ${theme.muted}`}>
							{bingoConfig?.subtitle ||
								"Click the matching tiles as you find them. Complete a row, column, or diagonal to trigger bingo."}
						</p>
					</div>

					<div className={`${theme.frame} rounded-2xl p-4 sm:p-5`}>
						<div className="flex items-center gap-3">
							<FontAwesomeIcon icon={faPalette} className={theme.accent} />
							<div>
								<p className="text-sm font-bold">Theme</p>
								<p className={`text-xs ${theme.muted}`}>
									Choose the board styling for play.
								</p>
							</div>
						</div>

						<div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
							<label className="block">
								<span className={`mb-2 block text-xs font-bold ${theme.accent}`}>
									Available themes
								</span>
								<select
									value={selectedThemeId}
									onChange={(e) => setSelectedThemeId(e.target.value)}
									className="w-full rounded border-2 border-black/10 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-accent-green dark:border-white/10 dark:bg-[#0a0a0a]"
								>
									{BINGO_THEMES.map((themeItem) => (
										<option key={themeItem.id} value={themeItem.id}>
											{themeItem.name}
										</option>
									))}
								</select>
							</label>

							<div className={`rounded-lg px-3 py-2 text-xs ${theme.badge}`}>
								{activeTheme.name}
							</div>
						</div>

						<p className={`mt-3 text-xs ${theme.muted}`}>
							{activeTheme.description}
						</p>
					</div>
				</section>

				<section className="relative z-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
					<div className={`${theme.frame} rounded-2xl p-5 sm:p-6`}>
						<div className="flex items-center gap-3">
							<FontAwesomeIcon icon={faCheck} className={theme.accent} />
							<h2 className="text-xl font-bold">How to play</h2>
						</div>

						<div className={`mt-4 space-y-4 text-sm ${theme.muted}`}>
							<p>
								Each tile contains a text clue from the admin-managed bingo list.
								Click the tile when you spot the phrase.
							</p>
							<p>
								Fill a full row, column, or diagonal to win. The board will show
								an overlay when bingo is complete.
							</p>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<div className="rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
								<p className={`text-xs uppercase tracking-[0.3em] ${theme.muted}`}>
									Marked
								</p>
								<p className="mt-2 text-2xl font-bold text-accent-green">
									{markedCount}/25
								</p>
							</div>
							<div className="rounded-xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
								<p className={`text-xs uppercase tracking-[0.3em] ${theme.muted}`}>
									Status
								</p>
								<p className="mt-2 text-2xl font-bold">
									{hasBingo ? "Bingo" : "Playing"}
								</p>
							</div>
						</div>

						<button
							onClick={handlePlayAgain}
							className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-accent-green px-4 py-2 text-sm font-bold text-accent-green transition-all hover:bg-accent-green hover:text-[#0d0d0d]"
						>
							<FontAwesomeIcon icon={faRotateRight} />
							Play again
						</button>
					</div>

					<div className={`${theme.panel} relative rounded-2xl p-4 sm:p-6`}>
						<div className="mb-4 flex items-center justify-between gap-4">
							<div>
								<p className={`text-xs uppercase tracking-[0.35em] ${theme.accent}`}>
									Board
								</p>
								<h2 className="text-xl font-bold">5 x 5 Bingo Grid</h2>
							</div>

							<div className={`rounded-full px-3 py-1 text-xs font-bold ${theme.badge}`}>
								Randomized tiles
							</div>
						</div>

						<div className="relative">
							<div className="grid grid-cols-5 gap-2 sm:gap-3">
								{board.map((cell, index) => {
									const isMarked = marked[index];
									const isWinning = winningLine?.includes(index) ?? false;

									return (
										<button
											key={`${cell}-${index}`}
											type="button"
											onClick={() => handleTileClick(index)}
											className={`relative min-h-[72px] overflow-hidden rounded-xl p-2 text-center text-xs font-bold leading-tight transition-all duration-200 sm:min-h-[88px] sm:text-sm ${theme.tile} ${theme.tileHover} ${
												isMarked ? theme.tileMarked : ""
											} ${isWinning ? theme.tileWinning : ""}`}
										>
											{isMarked && (
												<Image
													src={MARKED_CIRCLE_IMAGE}
													alt="Marked bingo circle"
													fill
													sizes="(max-width: 640px) 20vw, 110px"
													className="absolute inset-0 h-full w-full object-contain opacity-95"
												/>
											)}
											<span className="relative z-10 block break-words">{cell}</span>
										</button>
									);
								})}
							</div>

							{hasBingo && (
								<div className={`absolute inset-0 z-20 flex items-center justify-center rounded-2xl ${theme.overlay} backdrop-blur-sm`}>
									<div className="w-[92%] max-w-md rounded-3xl border-2 border-accent-green bg-[#f5f1e8] p-6 text-center text-[#2a2a2a] shadow-2xl dark:bg-[#0a0a0a] dark:text-[#e0e0e0]">
										<FontAwesomeIcon
											icon={faTrophy}
											className="text-4xl text-accent-green"
										/>
										<p className="mt-4 text-xs uppercase tracking-[0.45em] text-accent-green">
											Bingo
										</p>
										<h3 className="mt-2 text-3xl font-bold">You got it</h3>
										<p className="mt-3 text-sm text-[#6b6b6b] dark:text-[#a0a0a0]">
											A full sequence is marked. Press play again to randomize
											the board and start over.
										</p>
										<button
											onClick={handlePlayAgain}
											className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-green px-5 py-2 text-sm font-bold text-[#0d0d0d] transition-transform hover:-translate-y-0.5"
										>
											<FontAwesomeIcon icon={faRotateRight} />
											Play again
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>

				<section className="relative z-10">
					<div className={`${theme.frame} rounded-2xl p-5 sm:p-6`}>
						<p className={`text-xs uppercase tracking-[0.35em] ${theme.accent}`}>
							Notes
						</p>
						<p className={`mt-2 text-sm ${theme.muted}`}>
							Bingo words are loaded from the saved JSON data, so the admin panel
							can update the list without touching this page.
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}
