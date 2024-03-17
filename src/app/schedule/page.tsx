import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';

export default function Shedule() {
  return (
    <Layout route={ROUTES.SCHEDULE}>
      <Table />
    </Layout>
  );
}
