import { Playfair_Display } from 'next/font/google'
import gambar1 from '../public/quran1.png'
import arrowImg from '../public/arrow.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import ListPerAyah from '../components/ListPerAyah'
import Link from 'next/link'
import Loading from '../components/loading'
import { FaAngleDoubleRight } from "react-icons/fa";

const playfair = Playfair_Display({
    weight:'400', 
    subsets:['cyrillic'], 
    style:'normal'})

interface Chap{
  id:string,
  name_simple:string
}

type Ayat ={
  id:number,
  verse_key:string
}


const detail = ({
  chapter, 
  ayats, 
  translate, 
  audioFile, 
  allChapter
  }:any) =>{
  
  // const [dataAyah, setDataAyah] = useState<{id:number, text_indopak:string}[]>(
  //   [],
  //   ) =>>>>>>>>>>>> cara menggunakan useState di React (PENTING!!!)
    const router = useRouter();
    const { id } = router.query;
    const [visibleItems, setVisibleItems] = useState<number>(10); // Show 10 items initially
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(false)
    const [listAyat, setListAyat] = useState(false)
    const [currentPlay, setCurrentPlay] = useState<string>('')
    const [isPause,setIspause] = useState<boolean>(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
      const handleStart = () => {
        setLoading(true)
        };
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
    console.log(chapter)
    
    
    const loadMore = () => {
      setVisibleItems((prevValue) => prevValue + 10); // Load 10 more items
    };

    const ayatWithAudio = ayats.map((items1:any) => {
      let items2 = translate.find((items2:any) => items2.verse_key === items1.verse_key);
      let items3 = audioFile.find((items3:any) => items3.verse_key === items1.verse_key)
      return {...items1, ...items2, ...items3}
    });

    const display = () =>{
      if(id === '9' || id === '1'){
        return 'none'
      }else{
        return 'inline'
      }
    }

    const playAudio = (idPlayed:string) =>{
      setIspause(false)
      setCurrentPlay(idPlayed)

    }
    const stopAudio = () => {
      setIspause(prev => !prev)
      if(isPause == false){
        audioRef.current?.pause()
      }else{
        audioRef.current?.play()
      }
    }
    
    const scrollTop = (id:any) =>{
      const element = document.getElementById(id)
      if(element){
        element.scrollIntoView({behavior:'smooth'})
      }

    }

    

    return (
        <div>
            <section className={`${playfair.className} w-full h-28 text-sm md:text-lg border-b-2 border-green-500 fixed top-0 bg-white grid grid-cols-3 items-end text-center z-[1] ${loading === true && '-z-20'}`}>
              <div className='flex gap-4 justify-center pb-3'>
                <p className='italic'>Surah {chapter.id}/114 <span></span> </p>
                <Image src={arrowImg} alt='arrow down for surah' width={15} height={15} className={`self-end cursor-pointer ${list === true ? 'rotate-180 transition-all duration-700' : 'rotate-0 transition-all duration-1000' } `} onClick={() => setList(prev => !prev)}/>
              </div>
              <div className=''>
                <h1>{chapter.name_simple}</h1>
                <p className='text-sm opacity-50'>{chapter.translated_name.name}</p>
              </div>
              <div className='flex items-center justify-center'>
                <p className='italic p-3'>{`${chapter.revelation_order} Ayat`}</p>
                <Image src={arrowImg} alt='arrow down for ayat' className={`cursor-pointer w-5 h-5 ${listAyat === true ? 'rotate-90 transition-all duration-700' : 'rotate-0 transition-all duration-1000' } `} onClick={() => setListAyat(prev => !prev)}/>
              </div>
            </section>
            <div className='fixed top-28 left-4 md:left-14 lg:left-40 w-32 md:w-48 h-48 md:h-64 bg-gray-100 border-[1px] border-green-500 outline-none overflow-y-scroll z-10' style={{display:list?'inline' : 'none'}}>
              <ul className='w-full'>
                {
                  allChapter.map((chap:Chap) => (
                    <li className={`pl-2 border-b-2 hover:bg-green-500 ${chap.id == id && 'bg-green-500 text-white'}`} key={chap.id}>
                      <Link href={`/${chap.id}`} className={`${chap.id == id && 'pointer-events-none'}`}>{chap.name_simple}</Link>
                    </li>
                    
                  ))
                }
              </ul>
              {loading && <div className='z-50'><Loading/></div> }

            </div>
            <div className={`w-[100px] md:w-[300px] h-48 border-2 flex flex-wrap overflow-y-auto text-sm gap-4 justify-center fixed top-28 right-5 md:right-16 z-[5] bg-white transition-all duration-700 ${listAyat == true? 'translate-x-0': 'translate-x-96'}`}>
                {
                  ayatWithAudio.slice(0, visibleItems).map((ayat: Ayat) => (
                    <button key={ayat.id} className='border-r-2 border-b-2 border-green-300 w-8 p-1' onClick={() =>scrollTop(ayat.verse_key)}>{parseInt(ayat.verse_key.split(':')[1]).toLocaleString('ar-u-nu-arab')}</button>
                  ))
                }
                {
                  visibleItems < ayatWithAudio.length &&(
                    <button onClick={loadMore}  className='text-green-300'><FaAngleDoubleRight/></button>
                  )
                }

              </div>
            <section className='w-full h-64 text-center flex flex-col items-center justify-start gap-5 mt-28'>
              <h1 className='font-Noor text-2xl md:text-4xl pt-10'>{chapter.name_arabic}</h1>
              <Image
              src={gambar1}
              alt='alquran ilustration'
              width={80}
              height={80}
              className='mx-auto'/>
              <h1 className='font-Noor text-3xl pb-5 text-center' style={{display:display()}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h1>
            </section>
            
            <section className='content grid grid-cols-1 gap-5 mt-10 mb-5 relative'>
              {
                
                ayatWithAudio.slice(0,visibleItems).map((ayat:any) =>(
                  <div className={`border-2 border-green-300 w-[90%] mx-auto rounded-xl relative ${loading === true && '-z-10'} ${currentPlay == ayat.verse_key && 'border-green-800'}`} key={ayat.id} id={ayat.verse_key}>
                    <ListPerAyah 
                    id={ayat.id} 
                    verse_key={ayat.verse_key} 
                    ayat={ayat.text_uthmani} 
                    tranlateAyat={ayat.text} 
                    src={`https://verses.quran.com/${ayat.url}`}
                    playAyah={() => playAudio(ayat.verse_key)}
                    audioRef={audioRef}
                    idPlayed={currentPlay}
                    endAudio={() => setCurrentPlay('')}
                    handleStop={stopAudio}
                    isPause={isPause}/>
                  </div>
                ))
              }

              {visibleItems < ayatWithAudio.length && (
                <button onClick={loadMore} className='w-28 h-14 bg-green-500 mx-auto mb-20 rounded-xl hover:bg-green-300 text-white'>Load more</button>
              )}
            </section>
        </div>
    )
}

interface Chapter{
    id:string
}
export async function getStaticPaths() {
    const data = await fetch('https://api.quran.com/api/v4/chapters?language=in')
    const dataChapter = await data.json()

    const paths = dataChapter.chapters.map((chapter:Chapter) => {
        return{
            params: {id: `${chapter.id}`}
        }
    })
    return {
      paths,
      fallback: false,
       
    }
  }



  export async function getStaticProps(context:any) {
    const {id} = context.params
    const data = await fetch(`https://api.quran.com/api/v4/chapters/${id}?language=id`)
    const data2 = await fetch(`https://api.quran.com/api/v4/quran/verses/uthmani/?chapter_number=${id}`)
    const data3 = await fetch(`https://api.quran.com/api/v4/quran/translations/33?chapter_number=${id}&fields=verse_key`)
    const data5 = await fetch(`https://api.quran.com/api/v4/quran/recitations/3`)
    const data7 = await fetch('https://api.quran.com/api/v4/chapters?language=id')
    const chapter = await data.json()
    const dataAyat = await data2.json()
    const dataTranslate = await data3.json()
    const audioAyats = await data5.json()
    const allChapter = await data7.json()
    return {
      props: {
        chapter:chapter.chapter,
        ayats:dataAyat.verses,
        translate:dataTranslate.translations,
        audioFile:audioAyats.audio_files,
        allChapter:allChapter.chapters
      }, // will be passed to the page component as props
      
    }
  }


  

export default detail