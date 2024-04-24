'use client'

import Layout from '@/components/Layout/Layout';
import Table from '@/components/Table/Table';
import { ROUTES } from '@/types/types';
import getTeachers from '@/requests/getTeachers';
import { useEffect, useState } from 'react';
import getActivity from '@/requests/getActivity';

export default function Activity() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    getActivity().then((res) => {
        setActivity(res);
    });
  }, []);

  return (
    <Layout route={ROUTES.ACTIVITY}>
      <Table data={activity} name='publishingActivity' />
    </Layout>
  );
}
