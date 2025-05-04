import React from 'react';
import RootLayout from '../../component/layout/RootLayout';
import TopSearchCard from '../../component/topsearchcard/TopSearchCard';
const TopSearch = () => {
    return (
        <RootLayout className="space-y-12">
            <div className='w-full flex items-center justify-center text-center'>
                <h1 className=' md:text-lg text-3xl font-bold text-neutral-800'>Top Search
                    <span className='text-blue-600'> Bus</span></h1>
                
            </div>

            {/* top services card */}
            <div className='w-full grid grid-cols-3 gap-5'>
                <TopSearchCard routeForm={"Noida"} routeTo={"lucknow"} timeDuration={"10 Hrs"} price={"1600"} />
                <TopSearchCard routeForm={"Noida"} routeTo={"lucknow"} timeDuration={"10 Hrs"} price={"1600"} />
                <TopSearchCard routeForm={"Noida"} routeTo={"lucknow"} timeDuration={"10 Hrs"} price={"1600"}/>
            </div>
       </RootLayout>
    )
}
export default TopSearch;