export default async function getTeachers() {
    const res = await fetch('/api/teachers');
  
    console.log('res: ', res);
   
    if (!res.ok) {
      console.log('Failed to fetch data')
    }
   
    return res.json().data;
  }