const convertItalicsType = (md, tag) => {
  const { found, mdTag, mdText } = md.findTag(tag, tag);

  if (!found) {
    return md;
  }

  const element = mdText.wrapInElement("i");
  const newMd = md.replace(mdTag, element);
  return convertItalicsType(newMd, tag);
};

const convertItalics = md => {
  const doubleAstricks = convertItalicsType(md, "*");
  const double__ = convertItalicsType(doubleAstricks, "_");
  return double__;
};
export default convertItalics;
