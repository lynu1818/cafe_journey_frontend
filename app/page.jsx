'use client'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import ListArea from "@/components/SearchArea";
import { AuthProvider} from "@/components/AuthProvider";

export default function Home() {


  return (
    <>
        <AuthProvider>
            <Header />
            <main>
                <Hero />
                <ListArea />
            </main>
        </AuthProvider>

    </>
  )
}
