const convertSingleHeader = (mdToSearch, headerTag, htmlEle) => {
  const { found, mdTag, mdText } = mdToSearch.findTag(headerTag, "\n", {
    endAtDocEnd: true
  });

  if (!found) {
    return mdToSearch;
  }

  const element = mdText.wrapInElement(htmlEle); // ie: <h2>Subheader Title 1</h2>
  const newMd = mdToSearch.replace(mdTag, element); // ## Subheader Title 1 >> <h2>Subheader Title 1</h2>

  // Return recursively to check for more items with same tag
  return convertSingleHeader(newMd, headerTag, htmlEle);
};

const convertHeaders = md => {
  const headers = [
    {
      md: "######",
      html: "h6"
    },
    {
      md: "#####",
      html: "h5"
    },
    {
      md: "####",
      html: "h4"
    },
    {
      md: "###",
      html: "h3"
    },
    {
      md: "##",
      html: "h2"
    },
    {
      md: "#",
      html: "h1"
    }
  ];

  let changedMd = md;
  for (let i = 0; i < headers.length; i++) {
    changedMd = convertSingleHeader(changedMd, headers[i].md, headers[i].html);
  }

  return changedMd;
};

export default convertHeaders;
