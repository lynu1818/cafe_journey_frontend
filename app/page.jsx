'use client'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import ListArea from "@/components/SearchArea";
import {useState} from "react";
import {AuthContext} from "@/components/contexts";
import { AuthProvider} from "@/components/AuthProvider";

export default function Home() {


  return (
    <>
        <AuthProvider>
            <Header />
            <main>
                <Hero />
                <ListArea />
                {/*<PrimaryFeatures />*/}
                {/*<SecondaryFeatures />*/}
                {/*<CallToAction />*/}
                {/*<Testimonials />*/}
                {/*<Pricing />*/}
                {/*<Faqs />*/}
            </main>
            {/*<Footer />*/}
        </AuthProvider>

    </>
  )
}
