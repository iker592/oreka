import { DashboardComponent } from '../components/dashboard';
import Layout from '../components/Layout';
import withAdminAuth from '../components/withAdminAuth';

const DashboardPage = () => {
  console.log('DashboardPage component rendered');
  return (
    <Layout>
      <DashboardComponent />
    </Layout>
  );
};
export default withAdminAuth(DashboardPage);

