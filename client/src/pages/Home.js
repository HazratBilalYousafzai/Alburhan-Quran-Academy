import React from 'react'
import Layout from '../Components/Layout/Layout'
import HeroSection from './../Components/HeroSection';
import Services from '../Components/Services';
import IntroSection from '../Components/IntroSection';
import PricingSection from '../Components/PricingSection';

const Home = () => {
    return (
        <>
            <Layout title={"Home"}>
                <HeroSection />
                <IntroSection />
                <Services margin={10} />
                <PricingSection />
            </Layout>
        </>
    )
}

export default Home

