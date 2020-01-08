const convertImgs = md => {
  const alt = md.findTag("![", "]");

  if (!alt.found) {
    return md;
  }

  const srcIndex = alt.index.end;
  const src = md.findTag("(", ")", { offset: srcIndex });

  const mdTag = `![${alt.mdText}](${src.mdText})`;
  const element = `<img alt="${alt.mdText}" src="${src.mdText}" />`;

  const newMd = md.replace(mdTag, element);

  return convertImgs(newMd);
};

export default convertImgs;
