import React from 'react';
import Layout from '../components/Layout';
import CenteredContent from '../components/CenteredContent';

const Home = () => {
  return (
    <Layout>
      <CenteredContent>
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Oreka</h1>
        <p className="text-center text-gray-600">
          Where dreams come true and broskies live happily and free.
        </p>
      </CenteredContent>
    </Layout>
  );
};

export default Home;