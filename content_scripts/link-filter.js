(() => {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const cmpName = (a, b) => {
    const at = a.text.toLowerCase();
    const bt = b.text.toLowerCase();
    if (at < bt) {
      return -1;
    } else if (at > bt) {
      return 1;
    }
    return 0;
  };

  const filterLinks = ({text}, idx, ary) => {
    if (text && text !== '#') {
      return !idx || text != ary[idx - 1].text;
    }
    return false;
  }

  const cmpIndex = (a, b) => (a.index - b.index);

  const getLinks = () => {
    const ary = Array.from(document.getElementsByTagName('a'));
    const raw = ary.map(({href, innerText}, index) => ({
      href,
      index,
      text: innerText
    }));

    return raw
      .sort(cmpName)
      .filter(filterLinks)
      .sort(cmpIndex)
      .map(({href, text}) => ({href,text}));
  };

  const listener = ({command}) => {
    if (command === 'getlinks') {
      const links = getLinks();
      return Promise.resolve({links});
    }
  };

  browser.runtime.onMessage.addListener(listener);
})();
