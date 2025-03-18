import React, { useState } from 'react';
import Form from "./ExpenseForm";
import Table from "./ExpenseTBL";
import StatsCards from './Cards';
import ProgressBars from './ProgressBars';

const DailyExpense = () => {
    const [records, setRecords] = useState([]);

    return (
        <>
            <div className="max-h-[100vh] ">
                <StatsCards
                    records={records}
                    setRecords={setRecords}
                />
            </div>
            {/* <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">

                    <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                        <Form
                            records={records}
                            setRecords={setRecords}
                        />
                    </div>
                </div> */}

            <div className="flex justify-center items-end h-[30%]">
                <div className="bg-white shadow-lg rounded-lg p-4 w-[60%] max-h-[100vh] overflow-auto mb-5 flex justify-center gap-4">
                    <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[60vh]">
                        <ProgressBars />
                    </div>
                </div>
            </div>


            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] mt-12 overflow-auto flex flex-col gap-4">
                <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[50vh]">
                    <Table records={records} />
                </div>
            </div>
        </>
    );
};

export default DailyExpense;
