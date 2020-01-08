const _makePropStr = props => {
  return Object.keys(props).reduce((a, c) => `${a} ${c}="${props[c]}"`, "");
};

String.prototype.sanitize = function() {
  return this.replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*/g, "&ast;")
    .replace(/_/g, "&lowbar;")
    .replace(/-/g, "&mdash;")
    .replace(/\[/g, "&lbrack;")
    .replace(/\]/g, "&rbrack;")
    .replace(/\(/g, "&lpar;")
    .replace(/\)/g, "&rpar;")
    .replace(/!/g, "&excl;");
};

String.prototype.replaceLineBreaks = function() {
  return this.replace(/(?:\r\n|\r|\n)/g, "<br>");
};

String.prototype.wrapInElement = function(ele, props = {}) {
  return `<${ele} ${_makePropStr(props)}>${this}</${ele}>`;
};

String.prototype.findTag = function(identifer, endIndentifier, options = {}) {
  const { endAtDocEnd, offset } = options;

  const search = offset ? this.slice(offset) : this;
  const startIndex = search.indexOf(identifer);

  // If tag no longer exists in markdown (either not present or converted by previous recurive calls)
  // Return the markdown

  if (startIndex === -1) {
    return { found: false };
  }

  // Find MD Tag with text (for replace later) - Example: ## Subheader Title 1
  const mdTag_start = search.slice(startIndex); // ## Subheader Title 1\n### Unrelated thing etc...

  // Remove identifier from tag and search for endIndentifer
  // In case identifier and endIdentifier are the same, this will prevent a zero index found
  const slicedIndex = mdTag_start // ie: >= **Test**
    .slice(identifer.length) // ie: >= Test**
    .indexOf(endIndentifier); // ie: >= 5

  // Add back identifier length to get the true index
  let mdTag_end = slicedIndex === -1 ? -1 : slicedIndex + identifer.length;

  // If the end identifier is not found
  if (mdTag_end === -1) {
    // Set to end of doc index, if endAtDocEnd property is set
    if (endAtDocEnd) {
      mdTag_end = search.length - 1;
    } else {
      return { found: false };
    }
  }

  const mdTag = mdTag_start.slice(0, mdTag_end + endIndentifier.length); // ## Subheader Title 1

  // // Find MD Text (for constructing HTML element) - Example: Subheader Title 1
  const mdText_start = search.slice(startIndex + identifer.length);
  let mdText_end = mdText_start.indexOf(endIndentifier);

  // If the end identifier is not found
  if (mdText_end === -1) {
    // Set to end of doc index, if endAtDocEnd property is set
    if (endAtDocEnd) {
      mdText_end = search.length - 1;
    } else {
      return { found: false };
    }
  }

  const mdText = mdText_start.slice(0, mdText_end).trim();

  return {
    found: true,
    index: {
      start: startIndex,
      end: startIndex + mdTag_end
    },
    mdTag,
    mdText
  };
};

String.prototype.replaceWithElement = function(
  strToReplace,
  ele,
  content = "",
  props = {}
) {
  return this.replace(
    strToReplace,
    `<${ele} ${_makePropStr(props)}>${content}</${ele}>`
  );
};

String.prototype.formatAsHTML = function() {
  return `
   <body>
      <div id="content">
       ${this}
       </div>
  </body>
`;
};

String.prototype.convertDoubleLineBreaks = function() {
  return this.replace(/\n\n/g, "<br><br>");
};
