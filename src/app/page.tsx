import { ROUTES } from '@/types/types';
import Layout from '../components/Layout/Layout';
import s from './page.module.scss';

export default function Home() {
  return (
    <Layout route={ROUTES.HOME}>
      <main className={s.main}>
          <div className={s.content}>
            <div>content</div>
          </div>
      </main>
    </Layout>
  );
}
