import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';

export default function Disciplines() {
  return (
    <Layout route={ROUTES.DISCIPLINES}>
      <Table />
    </Layout>
  );
}
