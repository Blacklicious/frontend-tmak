
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import React from 'react';
import Mali from './ml/page';

const MiningNews: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Mali Mining News</title>
      </Head>
      <Mali />
    </div>
  );
};

export default MiningNews;
