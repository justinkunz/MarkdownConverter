const code = md => {
  const { found, mdTag, mdText } = md.findTag("`", "`");

  if (!found) {
    return md;
  }

  const element = mdText.sanitize().wrapInElement("span", { class: "code" });
  const newMd = md.replace(mdTag, element);
  return code(newMd);
};

export default code;
