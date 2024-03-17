import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';

export default function Teachers() {
  return (
    <Layout route={ROUTES.TEACHERS}>
      <Table />
    </Layout>
  );
}
