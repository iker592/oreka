import React from 'react';
import Layout from '../components/Layout';
import CenteredContent from '../components/CenteredContent';

const Home = () => {
  return (
    <Layout>
      <CenteredContent>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Welcome to Oreka</h1>
        <p className="text-center text-gray-300">
          A mental health platform for high performance athletes.
        </p>
      </CenteredContent>
    </Layout>
  );
};

export default Home;