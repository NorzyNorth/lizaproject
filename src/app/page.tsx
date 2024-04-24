'use client'

import { ROUTES } from '@/types/types';
import Layout from '../components/Layout/Layout';
import s from './page.module.scss';
import getDisciplines from '@/requests/getDisciplines';
import getTeachers from '@/requests/getTeachers';
import getActivity from '@/requests/getActivity';
import Table from '@/components/Table/Table';
import { useEffect, useState } from 'react';

export default function Home() { 
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getActivity().then((res) => {
        setActivity(res);
    });
  }, []);

  useEffect(() => {
    getDisciplines().then((res) => {
      setDisciplines(res);
    });
  }, []);

  useEffect(() => {
    getTeachers().then((res) => {
      setTeachers(res);
    });
  }, []);

  return (
    <Layout route={ROUTES.HOME}>
      <main className={s.main}>
          <div className={s.content}>
            <Table data={teachers} name={'teachers'} isMain />
              <Table data={disciplines} name={'disciplines'} isMain />
              <Table data={activity} name={'publishingActivity'} isMain />
          </div>
      </main>
    </Layout>
  );
}
