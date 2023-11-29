import getUrls from 'get-urls';

const extractUrls = (string: string) => {
  return Array.from(getUrls(string, { requireSchemeOrWww: true, stripWWW: false }));
};

export default extractUrls;
