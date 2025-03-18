import React from 'react'

const ProgressBars = () => {
    return (
        <>
            <div className="flex justify-center">
                <h1 className='text-2xl text-purple-400'>Order Status</h1>
            </div>
            
            <div className="mt-5">
                <p className="text-sm text-gray-600">Pending</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
                    <div className="bg-purple-300 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full" style={{width: "45%"}}> 45</div>
                </div>
            </div>
            
            <div className="mt-5">
                <p className="text-sm text-gray-600">Given</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
                    <div className="bg-purple-300 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full" style={{width: "70%"}}> 70</div>
                </div>
            </div>
            
            <div className="mt-5">
                <p className="text-sm text-gray-600">Recieved</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
                    <div className="bg-purple-300 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full" style={{width: "90%"}}> 90</div>
                </div>
            </div>

            <div className="mt-5">
                <p className="text-sm text-gray-600">Cancel</p>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-300">
                    <div className="bg-purple-300 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full" style={{width: "2%"}}> 2</div>
                </div>
            </div>
        </>
    )
}

export default ProgressBars;