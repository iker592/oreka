import { DashboardComponent } from '../components/dashboard';
import Layout from '../components/Layout';
import withAdminAuth from '../components/withAdminAuth';

const DashboardPage = () => {
  return (
    <Layout>
      <DashboardComponent />
    </Layout>
  );
};

export default withAdminAuth(DashboardPage);

