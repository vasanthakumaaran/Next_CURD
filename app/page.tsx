"use client"
import Image from 'next/image'
import "./globals.css"
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'
import Link from 'next/link'
import { error } from 'console'
import { useRouter } from 'next/navigation'

export default function Home() {
  return (
    <main>
       <TopicList/>
    </main>
  )
}



const getTopics = async()=>{
  try {
    const res = await fetch('http://localhost:3000/api/topics',{
      cache:"no-store",
    })
    
    if(!res.ok){
      throw new Error ("Failed to fetch topics");
    }

    return res.json();
  }catch (error){
    console.log("Error loading topics: ",error);

  }
}


export async function TopicList(){
  const {topics} = await getTopics();

  return(
    <>
    {topics.map((t: any)=>(
      <><div className='p-4 border border-slate-300 my-3 flex justify-between items-start'>
        <div>
          <h2 className='font-bold text-2xl'>{t.title}</h2>
          <div>{t.description}</div>
        </div>
         
        <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>

        
      </div> 

          
        </>
        ))}
      </>

  )
}


export function RemoveBtn({ id }:any) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}