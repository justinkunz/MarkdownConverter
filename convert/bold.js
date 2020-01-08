const convertBoldType = (md, tag) => {
  const { found, mdTag, mdText } = md.findTag(tag, tag);
  if (!found) {
    return md;
  }

  const element = mdText.wrapInElement("b");
  const newMd = md.replace(mdTag, element);
  return convertBoldType(newMd, tag);
};

const convertBold = md => {
  const doubleAstricks = convertBoldType(md, "**");
  const double__ = convertBoldType(doubleAstricks, "__");
  return double__;
};
export default convertBold;
