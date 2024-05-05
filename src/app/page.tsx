'use client'

import { ROUTES } from '@/types/types';
import Layout from '../components/Layout/Layout';
import s from './page.module.scss';
import getDisciplines from '@/requests/getDisciplines';
import getTeachers from '@/requests/getTeachers';
import getActivity from '@/requests/getActivity';
import Table from '@/components/Table/Table';
import { useEffect, useState } from 'react';
import getTeachingLoad from '@/requests/getTeachingLoad';

export default function Home() { 
  const [teachers, setTeachers] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [activity, setActivity] = useState([]);
  const [teachingLoad, setTeachingLoad] = useState([]);

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

  useEffect(() => {
    getTeachingLoad().then((res) => {
      setTeachingLoad(res);
    });
  }, []);

  return (
    <Layout route={ROUTES.HOME}>
      <main className={s.main}>
          <div className={s.content}>
            <Table data={teachers} name={'teachers'} isMain />
            <Table data={disciplines} name={'disciplines'} isMain />
            <Table data={activity} name={'publishingActivity'} isMain />
            <Table data={teachingLoad} name={'teachingLoad'} isMain />
          </div>
      </main>
    </Layout>
  );
}
