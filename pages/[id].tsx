import { Playfair_Display } from 'next/font/google'
import gambar1 from '../public/quran1.png'
import gambar2 from '../public/quran2.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import ListPerAyah from './components/ListPerAyah'

const playfair = Playfair_Display({
    weight:'400', 
    subsets:['cyrillic'], 
    style:'normal'})




const detail = ({chapter, ayats, translate, basmalah, audioFile}:any) =>{
  
  // const [dataAyah, setDataAyah] = useState<{id:number, text_indopak:string}[]>(
  //   [],
  //   ) =>>>>>>>>>>>> cara menggunakan useState di React (PENTING!!!)
    const router = useRouter();
    const { id } = router.query;
    const [visibleItems, setVisibleItems] = useState<number>(10); // Show 10 items initially
    
    
    const loadMore = () => {
      setVisibleItems((prevValue) => prevValue + 10); // Load 10 more items
    };

    const ayatWithAudio = ayats.map((items1:any) => {
      let items2 = translate.find((items2:any) => items2.verse_key === items1.verse_key);
      let items3 = audioFile.find((items3:any) => items3.verse_key === items1.verse_key)
      return {...items1, ...items2, ...items3}
    });
    console.log(ayatWithAudio)

    const display = () =>{
      if(id === '9' || id === '1'){
        return 'none'
      }else{
        return 'inline'
      }
    }

    return (
        <div>
            <section className={`${playfair.className} w-full h-28 flex justify-between p-5 items-end text-lg border-b-2 border-green-500`}>
                <p className='italic'>Surah {chapter.id}/114</p>
                <div className='text-center'>
                  <h1>{chapter.name_simple}</h1>
                  <p className='text-sm opacity-50'>{chapter.translated_name.name}</p>
                </div>
                <p className='italic'>{`Halaman ${chapter.pages[0]}-${chapter.pages[1]}`}</p>
            </section>
            <div className='absolute right-0 lg:right-20'>
              <Image
              src={gambar2}
              alt='gambar 2'
              width={100}
              height={100}/>
            </div>
            <section className='w-full h-64 text-center flex flex-col items-center justify-start gap-5'>
              <h1 className='font-Noor text-4xl pt-10'>{chapter.name_arabic}</h1>
              <Image
              src={gambar1}
              alt='alquran ilustration'
              width={80}
              height={80}
              className='mx-auto'/>
              <h1 className='font-Noor text-3xl pb-5 text-center' style={{display:display()}}>{basmalah[0].text_indopak}</h1>
            </section>
            
            <section className='content grid grid-cols-1 gap-5 mt-10'>
              {
                
                ayatWithAudio.slice(0,visibleItems).map((ayat:any) =>(
                  <div className='border-2 border-green-300 w-[90%] mx-auto rounded-xl' key={ayat.id}>
                    <ListPerAyah id={ayat.id} verse_key={ayat.verse_key} ayat={ayat.text_uthmani} tranlateAyat={ayat.text} src={`https://verses.quran.com/${ayat.url}`}/>
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
    const data4 = await fetch('https://api.quran.com/api/v4/quran/verses/indopak/?chapter_number=1')
    const data5 = await fetch(`https://api.quran.com/api/v4/quran/recitations/3`)
    const chapter = await data.json()
    const dataAyat = await data2.json()
    const dataTranslate = await data3.json()
    const basmalahText = await data4.json()
    const audioAyats = await data5.json()
    return {
      props: {
        chapter:chapter.chapter,
        ayats:dataAyat.verses,
        translate:dataTranslate.translations,
        basmalah:basmalahText.verses,
        audioFile:audioAyats.audio_files
      }, // will be passed to the page component as props
      
    }
  }


  

export default detail