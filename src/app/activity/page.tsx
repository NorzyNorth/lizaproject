'use client'

import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getTeachers from '@/requests/getTeachers';
import { useEffect, useState } from 'react';
import getActivity from '@/requests/getActivity';

export default function Activity() {
  const [activity, setActivity] = useState([]);
  const [sendedRequests, setSendedRequests] = useState(1);

  useEffect(() => {
    if (sendedRequests > 0) {
      setTimeout(() => {
        getActivity().then((res) => {
          setActivity(res);
      });
      }, 2000)
    }
  }, [sendedRequests]);

  useEffect(() => {
    getActivity().then((res) => {
        setActivity(res);
    });
  }, []);

  return (
    <Layout route={ROUTES.ACTIVITY}>
      <Table setSendedRequests={setSendedRequests} data={activity} name='publishingActivity' />
    </Layout>
  );
}
