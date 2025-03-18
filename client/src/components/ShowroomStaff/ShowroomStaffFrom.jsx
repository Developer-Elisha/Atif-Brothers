import { useState } from "react";

const StaffForm = ({ records, setRecords }) => {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
    
    const staffSalaries = {
        "Bilal": 40000,
        "Mehmood": 30000,
    };

    const [forms, setForms] = useState([{ 
        name: "", 
        salary: "", 
        remainingSalary: "", 
        amount: "", 
        date: formattedToday 
    }]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedForms = [...forms];
        
        if (name === "name") {
            updatedForms[index][name] = value;
            updatedForms[index].salary = staffSalaries[value] || "";
            updatedForms[index].remainingSalary = staffSalaries[value] || "";
        } else if (name === "amount") {
            updatedForms[index][name] = value;
            const staffName = updatedForms[index].name;
            const baseSalary = staffSalaries[staffName] || 0;
            const amount = parseFloat(value) || 0;
            updatedForms[index].remainingSalary = baseSalary - amount;
        }
        
        setForms(updatedForms);
    };

    const handleAddForm = () => {
        setForms([...forms, { 
            name: "", 
            salary: "", 
            remainingSalary: "", 
            amount: "", 
            date: formattedToday 
        }]);
    };

    const handleRemoveForm = (index) => {
        if (forms.length === 1) return;
        setForms(forms.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (forms.some(form => !form.name || !form.amount)) {
            alert("Please fill in all fields!");
            return;
        }

        const newRecords = forms.map(form => ({
            ...form,
            deductedAmount: form.amount
        }));

        setRecords([...records, ...newRecords]);
        setForms([{ 
            name: "", 
            salary: "", 
            remainingSalary: "", 
            amount: "", 
            date: formattedToday 
        }]);
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-xl font-semibold text-center mb-6">Staff</h2>
            <div className="flex justify-end gap-4 mt-6">
                <button
                    className="bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
                    onClick={handleAddForm}
                >
                    +
                </button>
            </div>

            {forms.map((formData, index) => (
                <div key={index} className="flex gap-4 my-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Date</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            disabled
                            className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Name</label>
                        <select
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange(index, e)}
                            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                            required
                        >
                            <option value="" disabled>Select Staff</option>
                            <option value="Bilal">Bilal</option>
                            <option value="Mehmood">Mehmood</option>
                        </select>
                    </div>

                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={formData.salary}
                            disabled
                            className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={(e) => handleChange(index, e)}
                            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                            placeholder="Enter Amount"
                            required
                        />
                    </div>

                    <div className="w-1/2">
                        <label className="block text-gray-700 font-medium">Remaining Salary</label>
                        <input
                            type="number"
                            name="remainingSalary"
                            value={formData.remainingSalary}
                            disabled
                            className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
                        />
                    </div>

                    <button
                        onClick={() => handleRemoveForm(index)}
                        className="bg-red-500 text-white mt-6 px-5 py-2 h-12 rounded-lg cursor-pointer hover:bg-red-600 transition-all"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={handleSubmit}
                    className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default StaffForm;
