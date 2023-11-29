/* eslint-disable @next/next/no-css-tags */
import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Container, CssBaseline } from '@mui/material';
import NextNProgress from 'nextjs-progressbar';
import DrawerAppBar, { appTitle } from './DrawerAppBar';
import dynamic from 'next/dynamic';

type Props = {
  children?: ReactNode;
  title?: string;
  footer?: string;
};

const NoSSRAgeVerification = dynamic(() => import('./AgeVerification') as any, {
  ssr: false,
});

const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{`${appTitle}${title ? ` - ${title}` : ''}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="/global.css" />
      </Head>

      <Container maxWidth="lg" style={{ position: 'relative' }}>
        <CssBaseline />
        <NextNProgress height={3} />

        <header style={{ height: '90px' }}>
          <DrawerAppBar />
        </header>

        {children}

        <NoSSRAgeVerification />

        <footer>
          <hr />
          <span>Be excellent to one another.</span>
          <span style={{ float: 'right' }}>
            <span style={{ marginLeft: '1em' }}>
              Discord:{' '}
              <a target="_blank" href={`https://discord.gg/G3UGqsS2Pm`} rel="noreferrer">
                BonnieBots
              </a>
            </span>
            <span style={{ marginLeft: '1em' }}>
              InSL:{' '}
              <a
                target="_blank"
                href="secondlife:///app/agent/5a6b0045-12db-4bf6-8108-7c27f024ca5b/about"
                rel="noreferrer"
              >
                bonniebelle86
              </a>
            </span>
            <span style={{ marginLeft: '1em' }}>
              Email:{' '}
              <a target="_blank" href={`mailto:'bonniebellebots@gmail.com'`} rel="noreferrer">
                bonniebellebots@gmail.com
              </a>
            </span>
          </span>
        </footer>
      </Container>
    </>
  );
};

export default Layout;
