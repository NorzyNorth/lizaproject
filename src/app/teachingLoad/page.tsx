'use client'

import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getTeachers from '@/requests/getTeachers';
import { useEffect, useState } from 'react';
import getTeachingLoad from '@/requests/getTeachingLoad';

export default function Teachers() {
  const [teachingLoad, setTeachingLoad] = useState([]);
  const [sendedRequests, setSendedRequests] = useState(1);

  useEffect(() => {
    getTeachingLoad().then((res) => {
      setTeachingLoad(res);
    });
  }, []);

  useEffect(() => {
    if (sendedRequests > 0) {
      setTimeout(() => {
        getTeachingLoad().then((res) => {
          setTeachingLoad(res);
        });
      }, 2000)
    }
  }, [sendedRequests]);

  return (
    <Layout route={ROUTES.TEACHING_LOAD}>
      <Table setSendedRequests={setSendedRequests} data={teachingLoad} name='teachingLoad' />
    </Layout>
  );
}
