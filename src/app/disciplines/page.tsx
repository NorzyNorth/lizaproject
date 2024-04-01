import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getDisciplines from '@/requests/getDisciplines';

export default function Disciplines() {
  const disciplines = getDisciplines();

  return (
    <Layout route={ROUTES.DISCIPLINES}>
      <Table data={disciplines} name={'disciplines'} />
    </Layout>
  );
}
