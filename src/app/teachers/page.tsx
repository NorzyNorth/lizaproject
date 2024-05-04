'use client'

import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getTeachers from '@/requests/getTeachers';
import { useEffect, useState } from 'react';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [sendedRequests, setSendedRequests] = useState(1);

  useEffect(() => {
    getTeachers().then((res) => {
      setTeachers(res);
    });
  }, []);

  useEffect(() => {
    if (sendedRequests > 0) {
      setTimeout(() => {
        getTeachers().then((res) => {
          setTeachers(res);
        });
      }, 2000)
    }
  }, [sendedRequests]);

  return (
    <Layout route={ROUTES.TEACHERS}>
      <Table setSendedRequests={setSendedRequests} data={teachers} name='teachers' />
    </Layout>
  );
}
