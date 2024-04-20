'use client'

import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getTeachers from '@/requests/getTeachers';
import { useEffect, useState } from 'react';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachers().then((res) => {
      setTeachers(res);
    });
  }, []);

  // const teachers1 = getTeachers();

  return (
    <Layout route={ROUTES.TEACHERS}>
      <Table data={teachers} name='teachers' />
    </Layout>
  );
}
