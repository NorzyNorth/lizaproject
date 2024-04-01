export default async function getActivity() {
    const res = await fetch('/api/activity');
  
    console.log('res: ', res);
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json().data;
  }