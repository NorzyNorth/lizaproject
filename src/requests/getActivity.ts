export default async function getActivity() {
    const res = await fetch('/api/publishingActivity');

   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json();;
  }