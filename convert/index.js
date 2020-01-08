import headers from "./headers.js";
import images from "./images.js";
import codeblock from "./codeblock.js";
import lists from "./lists.js";
import bold from "./bold.js";
import italics from "./italics.js";
import links from "./links.js";
import code from "./code.js";

String.prototype.convertHeaders = function() {
  return headers(this);
};

String.prototype.convertImages = function() {
  return images(this);
};

String.prototype.convertCodeBlocks = function() {
  return codeblock(this);
};

String.prototype.convertLists = function() {
  return lists(this);
};

String.prototype.convertBold = function() {
  return bold(this);
};

String.prototype.convertItalics = function() {
  return italics(this);
};

String.prototype.convertLinks = function() {
  return links(this);
};

String.prototype.convertCode = function() {
  return code(this);
};
