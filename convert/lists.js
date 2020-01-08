const convertLists = (md, tag, startingPoint = 0, items = []) => {
  // Markdown to search. For recursive calls for items within the same list

  const search = md.slice(startingPoint);
  // console.log(items, startingPoint);
  const { found, mdTag, mdText, index } = search.findTag(tag, "\n", {
    endAtDocEnd: true
  });

  // Exit condition for recurive fn - If no more list tags exist in target md
  if (!found) {
    return md;
  }

  // Add found tag data to items
  items.push({ mdTag, mdText });
  const slicedMd = search.slice(index.end);

  // Check if another list item exists
  if (slicedMd.indexOf(`\n${tag}`) === 0) {
    // If so, recursively call fn to check for next tag
    const nextStartingPoint = startingPoint + index.end;
    return convertLists(md, tag, nextStartingPoint, items);
  } else {
    // If no more items exist, list is complete

    // Wrap all list items under one unordered list
    const mdListContent = items.map(li => li.mdTag).join("");
    // console.log(items);
    const htmlListItems = items
      .map(li => `<li>${li.mdText.wrapInElement("span")}</li>`)
      .join("");
    console.log(htmlListItems);
    const element = `<ul>\n${htmlListItems}\n</ul>`;

    // Replace list in MD, recurisvely call fn to find the next list
    const newMd = md.replace(mdListContent, element);
    return convertLists(newMd, tag);
  }
};

export default md => {
  const asterick = convertLists(md, "* "); // Find * lists
  const dash = convertLists(asterick, "- "); // Find - lists
  return dash;
};
