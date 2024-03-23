import { ROUTES } from '@/types/types';
import Layout from '../components/Layout/Layout';
import s from './page.module.scss';
import getDisciplines from '@/requests/getDisciplines';
import getTeachers from '@/requests/getTeachers';
import getActivity from '@/requests/getActivity';
import Table from '@/components/Table/Table';

export default function Home() {
  const teachers = getTeachers();
  const disciplines = getDisciplines();
  const activity = getActivity();

  return (
    <Layout route={ROUTES.HOME}>
      <main className={s.main}>
          <div className={s.content}>
            <Table data={teachers} name={'teachers'} isMain />
            <div className={s.disciplinesAndActivity}>
              <Table data={disciplines} name={'disciplines'} isMain />
              <Table data={activity} name={'activity'} isMain />
            </div>
          </div>
      </main>
    </Layout>
  );
}
