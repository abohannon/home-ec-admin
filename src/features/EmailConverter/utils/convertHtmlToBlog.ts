export const parseHtmlString = (htmlString: string): Document => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, 'text/html');
  return document;
};

export const getStyleTag = (document: Document) => {
  return document.querySelector('style');
};

export const getCenterTag = (document: Document) => {
  return document.querySelector('center');
};

export const removeFooter = (centerTag: HTMLElement | null) => {
  const footer = centerTag?.querySelector('#templateFooter');
  footer?.remove();
  return centerTag;
};

export const combineHtml = (
  styleTag: HTMLStyleElement | null,
  centerTag: HTMLElement | null,
) => {
  let result = '';

  if (styleTag) {
    result = result + styleTag.outerHTML;
  }

  if (centerTag) {
    result = result + centerTag.outerHTML;
  }

  return result;
};

export const addShadowDom = (htmlString: string) => {
  if (typeof htmlString === 'string') {
    return `<script>
      const elem = document.querySelector(".article-template__content")
      const shadowRoot = elem.attachShadow({ mode: "open" })
      shadowRoot.innerHTML = \`${htmlString}\`
    </script>`;
  }

  return '';
};

export default (htmlString: string) => {
  const document = parseHtmlString(htmlString);
  const styleTag = getStyleTag(document);
  const centerTagWithoutFooter = removeFooter(getCenterTag(document));
  const blogHtml = addShadowDom(combineHtml(styleTag, centerTagWithoutFooter));

  return blogHtml;
};
