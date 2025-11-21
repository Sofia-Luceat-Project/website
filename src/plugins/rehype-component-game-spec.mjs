/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a game spec component.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} [properties.genre] - The game genre.
 * @param {string} [properties.players] - The number of players.
 * @param {string} [properties.platform] - The platform(s).
 * @param {string} [properties.release] - The release date.
 * @param {import('mdast').RootContent[]} children - The children elements of the component (should be empty).
 * @returns {import('mdast').Parent} The created game spec component.
 */
export function GameSpecComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid directive. ("game-spec" directive must be leaf type "::game-spec{genre=\\"...\\" players=\\"...\\"}")',
		);

	const specs = [];
	if (properties.genre) {
		specs.push({
			label: "ジャンル",
			value: properties.genre,
			icon: "bx:game",
		});
	}
	if (properties.players) {
		specs.push({
			label: "プレイヤー",
			value: properties.players,
			icon: "ri:game-2-line",
		});
	}
	if (properties.platform) {
		specs.push({
			label: "プラットフォーム",
			value: properties.platform,
			icon: "streamline:desktop-game-remix",
		});
	}
	if (properties.release) {
		specs.push({
			label: "リリース",
			value: properties.release,
			icon: "catppuccin:release",
		});
	}

	if (specs.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid game spec. (At least one attribute is required: genre, players, platform, release)',
		);

	const specItems = specs.map((spec) =>
		h(
			"div",
			{
				class: "group flex items-center gap-3 px-5 py-3.5 border-b border-[var(--line-color)] last:border-b-0 transition-all duration-200 hover:bg-[var(--btn-plain-bg-hover)]",
			},
			[
				h("div", {
					class: "flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--btn-regular-bg)] text-[var(--primary)] transition-all duration-200 group-hover:bg-[var(--primary)] group-hover:text-white group-hover:scale-110 game-spec-icon-wrapper",
					"data-icon": spec.icon,
				}, [
					h("img", {
						src: `https://api.iconify.design/${spec.icon.replace(":", "/")}.svg`,
						alt: spec.label,
						class: "game-spec-icon",
						style: "object-fit: contain; width: 1.25rem; height: 1.25rem;",
						loading: "lazy",
					}, []),
				]),
				h("div", { class: "flex-1 min-w-0" }, [
					h("div", { class: "font-semibold text-xs uppercase tracking-wider text-[var(--btn-content)] mb-0.5" }, spec.label),
					h("div", { class: "text-sm text-90 leading-relaxed" }, spec.value),
				]),
			],
		),
	);

	return h(
		"div",
		{
			class: "my-6 rounded-xl border border-[var(--line-color)] bg-[var(--card-bg)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
		},
		specItems,
	);
}

