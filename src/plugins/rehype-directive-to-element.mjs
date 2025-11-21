import { visit } from "unist-util-visit";

/**
 * Converts remark-directive nodes to HTML elements in HAST.
 * This allows rehype-components to match directives by tag name.
 * 
 * remark-directive-rehype converts directives to div elements.
 * This plugin converts those divs to elements with the directive name as tag name.
 */
export function rehypeDirectiveToElement() {
	return (tree) => {
		visit(tree, (node) => {
			// Check if this is a directive node converted by remark-directive-rehype
			// It should have data-directive-name attribute or data-hName
			if (node.type === "element") {
				// Check for data-directive-name attribute (from remark-directive-rehype)
				if (node.properties && node.properties["data-directive-name"]) {
					const directiveName = node.properties["data-directive-name"];
					// Convert to use directive name as tag name
					node.tagName = directiveName;
					// Remove the data-directive-name attribute as it's no longer needed
					delete node.properties["data-directive-name"];
				}
				// Also check for nodes with hName in data (from parseDirectiveNode)
				else if (node.data && node.data.hName) {
					node.tagName = node.data.hName;
					// Merge hProperties into properties
					if (node.data.hProperties) {
						Object.assign(node.properties, node.data.hProperties);
					}
				}
			}
		});
	};
}

