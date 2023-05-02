
import Layout from './components/Layout'
import Card from './components/Card'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, Suspense, useState, useEffect } from 'react'
import { Playfair_Display } from 'next/font/google'
import Loading from './components/loading'

const playfair = Playfair_Display({
  weight:'400', 
  subsets:['cyrillic'], 
  style:'normal'})


interface Result {
  id:number, 
  name_simple:string, 
  name_arabic:string, 
  revelation_order:number,
  translated_name:{
    name:string
  }
}

export default function Home(props:any) {
  const {dataChapters} = props
  const [query, setQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Result[]>()
  const [isOn, setISOn] = useState<boolean>(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);



  const handleQuery = (e:ChangeEvent<HTMLInputElement>) =>{
    setQuery(e.target.value)
  }
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    const q = query.toLocaleLowerCase()
    const filteredResults = dataChapters.filter(
      (result:any) =>
        result.name_simple.toLowerCase().includes(q) 
        
    );
    setSearchResult(filteredResults)
    setISOn(true)
  }

  return (
    <Layout >
      <section className='w-full h-24 mt-10 flex items-center justify-center'>
        <form action="search surah" onSubmit={handleSubmit}>
          <input type="text" minLength={4} className='w-72 h-16 border-2 border-green-300 outline-green-500 p-5 invalid:outline-red-500' placeholder='Ketik nama surah...' onChange={handleQuery}/>
          <button type='submit' className='w-24 h-16 bg-green-500 text-white hover:bg-green-300 disabled:opacity-60' disabled={query.length < 4}>Search</button>
        </form>
      </section>
      {loading && <Loading/>}
      
      <div className='w-[90%] md:w-[500px] min-h-28 lg:min-h-32 bg-white mx-auto right-0 left-0 absolute items-center justify-center border-2 border-green-300 z-10 flex-col shadow-2xl shadow-green-300' style={{display:query.length > 3 && isOn === true ? 'flex':'none', opacity:loading === true? '0' : '1'}}>
        
        {
          searchResult && searchResult.length <= 0 &&(
            <div className='w-full h-24 flex items-center justify-center'>
              <h1 className={playfair.className}>Tidak ada hasil</h1>
            </div>
          )
        }
        {
          searchResult?.map((res) => (
              <div className='w-full h-24 outline-none mx-auto rounded-xl grid grid-cols-3 grid-rows-2 items-center justify-center text-center hover:bg-green-200 text-green-900 hover:scale-x-105 transition-all cursor-pointer' 
              key={res.id} 
              onClick={() => router.push(`/${res.id}`)}
              >
                <p className='row-span-2 w-20'>{res.id}</p>
                <h1 className={`${playfair.className} text-left -m-10`}>{res.name_simple}</h1>
                <p className={`${playfair.className} col-start-2 row-start-2 col-span-2 text-left text-sm opacity-80 -m-10`}>{res.translated_name.name}</p>
                <p className='font-Noor text-2xl col-start-3 row-start-1 text-right mr-5'>{res.name_arabic}</p>
                <p className={`${playfair.className} col-start-3 row-start-2 text-sm text-right mr-5`}>{res.revelation_order} Ayat</p>
              </div>
          ))
        }
      </div>
        <section className='w-full min-[500px] mt-10 grid grid-cols-1 lg:grid-cols-3 gap-3 relative'>       
          {
            dataChapters.map((chapter:any) => {
              return (
              <div key={chapter.id} onClick={() => router.push(`/${chapter.id}`)} className='overflow-x-hidden' style={{opacity:loading===true?'0':'1'}}>
                <Card title_arabic={chapter.name_arabic} title={chapter.name_simple} id={chapter.id} jumlah_ayat={chapter.verses_count} title_indo={chapter.translated_name.name}/>
              </div>
              )
                
            })
          }

        </section>
    </Layout>
  )
}


export const getStaticProps = async () => {
  const response = await fetch('https://api.quran.com/api/v4/chapters?language=id')
  const dataChapters = await response.json()

  return{
    props: {
      dataChapters:dataChapters.chapters
    }
  }
}