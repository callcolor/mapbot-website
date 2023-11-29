import { NextPage } from 'next';

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  if (typeof window !== 'undefined') {
    if (!window.location.href.includes('reload')) {
      window.location.href = window.location.href + '?reload=true';
    }
  }

  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server.` : 'An error occurred on client.'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
