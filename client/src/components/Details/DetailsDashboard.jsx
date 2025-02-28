import React, { useState } from "react";
import Form from "./BillReviews";
import ExpenseTBL from "./BillReviewsTBL";
import StitchingDetailsTBL from "./StitchingDetailsTBL";
import KarigerDetailsTBL from "./KarigerDetailsTBL";
import TotalExpenseTBL from "./TotalExpenseTBL";
import GrandTotalTBL from "./GrandTotalTBL";

const DetailsDashboard = () => {
    const [billNo, setBillNo] = useState("");
    
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getFullYear()}`;
    const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

    const sampleRecords = [
        { quantity: 2, bill: "10", tag: "A1", kariger: "John", description: "Gold Ring", amount: 500, balance: 50, date: "01-01-2020", rate: 500, kapra: "Silk", sticting: "Hand Stitching", cost: 100, profit: 400 },
        { quantity: 1, bill: "11", tag: "B2", kariger: "Smith", description: "Silver Chain", amount: 300, balance: 30, date: "01-01-2020", rate: 500, kapra: "Silk", sticting: "Hand Stitching", cost: 100, profit: 400 },
        { quantity: 2, bill: "10", tag: "A1", kariger: "John", description: "Gold Ring", amount: 500, balance: 50, date: "01-01-2020", rate: 500, kapra: "Silk", sticting: "Hand Stitching", cost: 100, profit: 400 },
        { quantity: 1, bill: "11", tag: "B2", kariger: "Smith", description: "Silver Chain", amount: 300, balance: 30, date: "01-01-2020", rate: 500, kapra: "Silk", sticting: "Hand Stitching", cost: 100, profit: 400 },
        { quantity: 2, bill: "10", tag: "A1", kariger: "John", description: "Gold Ring", amount: 500, balance: 50, date: "01-01-2020", rate: 500, kapra: "Silk", sticting: "Hand Stitching", cost: 100, profit: 400 },
        { quantity: 1, bill: "11", tag: "B2", kariger: "Smith", description: "Silver Chain", amount: 300, balance: 30, date: "01-01-2020", rate: 500, kapra: "Silk", sticting: "Hand Stitching", cost: 100, profit: 400 },
    ];

    // Filter records based on entered bill number
    const filteredRecords = billNo ? sampleRecords.filter(record => record.bill === billNo) : [];

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
                <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                    <p>{formattedDate}</p>
                    <p>{dayName}</p>
                    <Form billNo={billNo} setBillNo={setBillNo} />
                </div>
            </div>

            {filteredRecords.length > 0 ? (
                <>
                    <div className="bg-white shadow-lg rounded-lg p-4 mt-20 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
                        <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                            <ExpenseTBL records={filteredRecords} />
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 mt-20 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
                        <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                            <StitchingDetailsTBL records={filteredRecords} />
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 mt-20 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
                        <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                            <KarigerDetailsTBL records={filteredRecords} />
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 mt-20 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
                        <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                            <TotalExpenseTBL records={filteredRecords} />
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-4 mt-20 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
                        <div className="max-h-[70vh] overflow-y-auto scrollbar-purple">
                            <GrandTotalTBL records={filteredRecords} />
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 mt-10">No records found for Bill No: {billNo}</p>
            )}
        </>
    );
};

export default DetailsDashboard;
