/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a YouTube embed component with lazy loading.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.id - The YouTube video ID (required).
 * @param {import('mdast').RootContent[]} children - The children elements of the component (should be empty).
 * @returns {import('mdast').Parent} The created YouTube embed component.
 */
export function YoutubeComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid directive. ("youtube" directive must be leaf type "::youtube{id=\\"...\\"}")',
		);

	if (!properties.id)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid YouTube ID. ("id" attribute is required)',
		);

	const videoId = properties.id;
	const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
	const embedUrl = `https://www.youtube.com/embed/${videoId}`;

	// Generate unique ID for this embed
	const embedId = `yt-${Math.random().toString(36).slice(2, 9)}`;

	// Create the lazy-loading YouTube embed structure
	const wrapper = h(
		"div",
		{
			class: "my-4 relative w-full",
			style: "padding-bottom: 56.25%; height: 0; overflow: hidden;",
		},
		[
			h("div", {
				id: embedId,
				class: "absolute top-0 left-0 w-full h-full cursor-pointer bg-black",
				style: `background-image: url(${thumbnailUrl}); background-size: cover; background-position: center;`,
			}, [
				// Play button overlay
				h("div", {
					class: "absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition",
				}, [
					h("div", {
						class: "w-16 h-16 rounded-full bg-red-600 flex items-center justify-center",
					}, [
						h("div", {
							class: "w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1",
						}),
					]),
				]),
			]),
			// Hidden iframe (will be shown on click)
			h("iframe", {
				id: `${embedId}-iframe`,
				src: "",
				class: "hidden absolute top-0 left-0 w-full h-full",
				allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
				allowfullscreen: "",
				loading: "lazy",
			}),
		],
	);

	// Script to handle click and load iframe
	const script = h(
		"script",
		{ type: "text/javascript" },
		`
(function() {
  const container = document.getElementById('${embedId}');
  const iframe = document.getElementById('${embedId}-iframe');
  if (container && iframe) {
    container.addEventListener('click', function() {
      iframe.src = '${embedUrl}?autoplay=1';
      iframe.classList.remove('hidden');
      container.style.display = 'none';
    });
  }
})();
    `.trim(),
	);

	return h("div", { class: "youtube-embed-wrapper" }, [wrapper, script]);
}

