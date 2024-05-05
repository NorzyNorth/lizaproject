export default async function getTeachingLoad() {
    const res = await fetch('/api/teachingLoad');

   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json();;
  }