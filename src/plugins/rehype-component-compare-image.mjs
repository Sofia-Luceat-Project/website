/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a compare image component with slider.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.before - The "before" image URL (required).
 * @param {string} properties.after - The "after" image URL (required).
 * @param {string} [properties.label] - Optional label for the comparison.
 * @param {import('mdast').RootContent[]} children - The children elements of the component (should be empty).
 * @returns {import('mdast').Parent} The created compare image component.
 */
export function CompareImageComponent(properties, children) {
	if (Array.isArray(children) && children.length !== 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid directive. ("compare-image" directive must be leaf type "::compare-image{before=\\"...\\" after=\\"...\\"}")',
		);

	if (!properties.before || !properties.after)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid images. ("before" and "after" attributes are required)',
		);

	const compareId = `compare-${Math.random().toString(36).slice(2, 9)}`;
	const sliderId = `${compareId}-slider`;
	const beforeId = `${compareId}-before`;
	const afterId = `${compareId}-after`;

	const wrapper = h(
		"div",
		{
			id: compareId,
			class: "my-4 relative w-full rounded-lg overflow-hidden border border-[var(--border-color)]",
			style: "aspect-ratio: 16/9;",
		},
		[
			// Before image (left side, clipped from right) - properties.beforeのURLを使用
			h("div", {
				id: beforeId,
				class: "absolute inset-0 overflow-hidden",
				style: "clip-path: inset(0 50% 0 0);",
			}, [
				h("img", {
					src: properties.before,
					alt: "Before",
					class: "absolute inset-0 w-full h-full object-cover",
				}),
			]),
			// After image (right side, clipped from left) - properties.afterのURLを使用
			h("div", {
				id: afterId,
				class: "absolute inset-0 overflow-hidden",
				style: "clip-path: inset(0 0 0 50%);",
			}, [
				h("img", {
					src: properties.after,
					alt: "After",
					class: "absolute inset-0 w-full h-full object-cover",
				}),
			]),
			// Slider control
			h("input", {
				type: "range",
				id: sliderId,
				min: "0",
				max: "100",
				value: "50",
				class: "absolute inset-y-0 left-0 w-full h-full cursor-ew-resize opacity-0 z-10",
			}),
			// Slider handle
			h("div", {
				id: `${compareId}-handle`,
				class: "absolute inset-y-0 w-1 bg-white shadow-lg z-20 pointer-events-none",
				style: "left: 50%;",
			}, [
				h("div", {
					class: "absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 pointer-events-none",
					style: "transform: translate(-50%, -50%);",
				}, [
					h("div", {
						class: "absolute top-1/2 left-1/2 w-0 h-0 border-l-2 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent",
						style: "transform: translate(-25%, -50%);",
					}),
					h("div", {
						class: "absolute top-1/2 left-1/2 w-0 h-0 border-r-2 border-r-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent",
						style: "transform: translate(25%, -50%);",
					}),
				]),
			]),
		],
	);

	// Script to handle slider
	const script = h(
		"script",
		{ type: "text/javascript" },
		`
(function() {
  const slider = document.getElementById('${sliderId}');
  const beforeDiv = document.getElementById('${beforeId}');
  const afterDiv = document.getElementById('${afterId}');
  const handle = document.getElementById('${compareId}-handle');
  if (slider && beforeDiv && afterDiv && handle) {
    function updateSlider(value) {
      const percent = value + '%';
      // Before image (left side): clip from right
      // valueが大きい（右）→ beforeが広がる（右側のクリップが減る）
      beforeDiv.style.clipPath = 'inset(0 ' + (100 - value) + '% 0 0)';
      // After image (right side): clip from left
      // valueが小さい（左）→ afterが広がる（左側のクリップが減る）
      afterDiv.style.clipPath = 'inset(0 0 0 ' + value + '%)';
      handle.style.left = percent;
    }
    slider.addEventListener('input', function(e) {
      updateSlider(parseInt(e.target.value));
    });
    slider.addEventListener('mousemove', function(e) {
      if (e.buttons === 1) {
        updateSlider(parseInt(e.target.value));
      }
    });
    // Initialize
    updateSlider(50);
  }
})();
    `.trim(),
	);

	const labelElement = properties.label
		? h("p", { class: "text-sm font-semibold mb-2 text-center" }, properties.label)
		: null;

	return h("div", { class: "compare-image-wrapper" }, [labelElement, wrapper, script].filter(Boolean));
}

