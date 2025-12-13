import React from 'react';
import Home from './Home';
import Brands from './Brands';
import Review from './review/Review';
import ProjectOverview from './ProjectOverviwe/ProjectOverview';
import HeroSection from './HeroSection/HeroSection';
import Hero from './HeroSection/Hero';
import HomeProducts from './HomeProducts';
import OverVew from './OverVewProject/OverVew';
import ProjectSummaryUi from '../ProjectSumarry/ProjectSummaryUi';

const reviwsload=fetch("/reviews.json")
    .then(res=>res.json())
   
const Homepage = () => {
  
    return (
        <div className='w-full overflow-hidden'>
             <Hero/>
             <HomeProducts/>
             <ProjectSummaryUi/>
             <OverVew/>
                <Brands/>
               <ProjectOverview/>
            <HeroSection/>
         
            {/* <Card1/> */}
            {/* <Survices/> */}
          
            
          
           <Review reviwsload={reviwsload}></Review>
        </div>
    );
};

export default Homepage;