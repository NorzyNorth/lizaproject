export default async function getDisciplines() {
    const res = await fetch('/api/disciplines');
  
    console.log('res: ', res);
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json().data;
  }