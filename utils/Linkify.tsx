import ReactLinkify from 'react-linkify';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = new LinkifyIt();
linkify.tlds(tlds);
linkify.add('secondlife:///', {
  validate: (text: string, pos: number, self: LinkifyIt.LinkifyIt) => {
    const tail = text.slice(pos);
    if (tail.includes('pay')) {
      return false;
    }
    const endings = ['about', 'select', 'requestfriend', 'inspect', 'complete'];
    for (const ending of endings) {
      if (tail.includes(ending)) {
        const split = tail.split(ending);
        return split[0].length + ending.length;
      }
    }
    return false;
  },
});

const Linkify = ({ children }: { children: any }) => {
  return (
    <ReactLinkify
      componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => {
        return (
          <a href={decoratedHref} key={key} target={'_blank'} rel="noreferrer">
            {decoratedText}
          </a>
        );
      }}
      matchDecorator={(text: string) => {
        return linkify.match(text);
      }}
    >
      {children}
    </ReactLinkify>
  );
};

export default Linkify;
