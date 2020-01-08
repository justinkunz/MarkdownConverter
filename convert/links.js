const convertLinks = md => {
  const title = md.findTag("[", "]");

  if (!title.found) {
    return md;
  }

  const titleIndex = title.index.end;
  const href = md.findTag("(", ")", { offset: titleIndex });

  const mdTag = `[${title.mdText}](${href.mdText})`;
  const element = title.mdText.wrapInElement("a", {
    href: href.mdText,
    _target: "blank"
  });

  const newMd = md.replace(mdTag, element);

  return convertLinks(newMd);
};

export default convertLinks;
