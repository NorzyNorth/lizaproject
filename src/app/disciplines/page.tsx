'use client'

import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getDisciplines from '@/requests/getDisciplines';
import { useEffect, useState } from 'react';

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState([]);
  const [sendedRequests, setSendedRequests] = useState(1);

  useEffect(() => {
    if (sendedRequests > 0) {
      setTimeout(() => {
        getDisciplines().then((res) => {
          setDisciplines(res);
        });
      }, 2000)
    }
  }, [sendedRequests]);

  useEffect(() => {
    getDisciplines().then((res) => {
      setDisciplines(res);
    });
  }, []);

  return (
    <Layout route={ROUTES.DISCIPLINES}>
      <Table setSendedRequests={setSendedRequests} data={disciplines} name={'disciplines'} />
    </Layout>
  );
}
