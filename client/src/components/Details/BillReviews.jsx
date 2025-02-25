import React from "react";

const BillReviews = ({ billNo, setBillNo }) => {
    const handleSubmit = () => {
        if (!billNo.trim()) {
            alert("Please enter a bill number!");
            return;
        }
        alert(`Fetching records for Bill No: ${billNo}`);
    };

    return (
        <div className="p-6 w-full max-h-[80vh] relative mb-10">
            <h2 className="text-xl font-semibold text-center mb-6">Bill Reviews</h2>
            <div className="flex items-center justify-center w-full mb-5">
                <div className="w-1/3">
                    <label className="block text-gray-700 font-medium">Bill No</label>
                    <input
                        type="text"
                        name="billNo"
                        value={billNo}
                        onChange={(e) => setBillNo(e.target.value)}
                        className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                        placeholder="Enter Bill No"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default BillReviews;
