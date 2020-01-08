import "./helpers.js";
import "./convert/index.js";

const handler = () => {
  const source = document.getElementsByTagName("pre")[0].innerText;

  const converted = source
    .convertCodeBlocks()
    .convertCode()
    .convertHeaders()
    .convertLists()
    .convertImages()
    .convertBold()
    .convertItalics()
    .convertLinks()
    .convertDoubleLineBreaks()
    .formatAsHTML();

  document.getElementsByTagName("body")[0].innerHTML = converted;
};

handler();
