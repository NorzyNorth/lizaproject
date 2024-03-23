import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getTeachers from '@/requests/getTeachers';

export default function Teachers() {
  const teachers = getTeachers();

  return (
    <Layout route={ROUTES.TEACHERS}>
      <Table data={teachers} name='teachers' />
    </Layout>
  );
}
