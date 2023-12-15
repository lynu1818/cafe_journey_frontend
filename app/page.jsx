'use client'
import { Header } from '@/components/Header'
import ListArea from "@/components/SearchArea";
import { CookiesProvider} from "next-client-cookies/server";


export default function Home() {


  return (
    <>
        <CookiesProvider>
            <Header />
            <main>
                <ListArea />
            </main>
        </CookiesProvider>
    </>
  )
}
