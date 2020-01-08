const convertCodeBlock = md => {
  const start = md.indexOf("```\n");

  if (start === -1) {
    return md;
  }

  const { mdTag, mdText, found } = md.findTag("```\n", "\n```", {
    endAtDocEnd: true
  });

  if (!found) {
    return md;
  }

  const codeBlockHtml = mdText
    .sanitize()
    .replaceWithElement(/ /g, "span", "", { class: "codeblockSpace" })
    .replaceLineBreaks()
    .wrapInElement("div", { class: "codeblock" });

  const newMd = md.replace(mdTag, codeBlockHtml);

  return convertCodeBlock(newMd);
};

export default convertCodeBlock;
