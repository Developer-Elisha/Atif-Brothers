import { useEffect, useState } from "react";
import OrderForm from "./MainForm";
import Modal from "./Modal";
import CancelModal from "./Cancel";

const CustomerForm = ({ records, setRecords, setShowMeasurement, editIndex, setEditIndex  }) => {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    const [lastSuitNumber, setLastSuitNumber] = useState(1);
    const [forms, setForms] = useState([
        {
            suit: `S-1`,
            tag: "",
            kariger: "",
            quantity: "",
            description: "",
            received: "",
            paymentType: "",
            advancePayment: "",
            dueAmount: "",
            payment: "",
            bank: "",
            currentPayment: "",
            rate: "",
        },
    ]);

    useEffect(() => {
          if (editIndex !== null) {
            const recordToEdit = records[editIndex];
            setForms([recordToEdit]);
          }
        }, [editIndex, records]);

    const [sale, setSale] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [bill, setBill] = useState("");
    const [date, setDate] = useState(formattedToday);
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenLess, setIsOpenLess] = useState(false);
    const [isOpenCancel, setIsOpenCancel] = useState(false);

    const [formDataAdd, setFormDataAdd] = useState({
        billNo: "",
        suitNo: "",
        description: "",
        amount: "",
        order: "",
        shopName: "",
        tagNo: "",
        details: "",
    });

    const [formDataLess, setFormDataLess] = useState({
        billNo: "",
        suitNo: "",
        description: "",
        amount: "",
        order: "",
        shopName: "",
        tagNo: "",
        details: "",
    });

    const handleModalChange = (e, setFormData) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const getSuitNumbers = (billNo) => {
        return records
            .filter(record => record.bill === billNo)
            .map(record => record.suit);
    };

    const handleSubmitAmountChange = (isAdding) => {
        const formData = isAdding ? formDataAdd : formDataLess;
        const amountValue = parseFloat(formData.amount);

        if (!formData.suitNo || isNaN(amountValue)) {
            alert("Please enter Suit No and a valid Amount");
            return;
        }

        setRecords((prevRecords) =>
            prevRecords.map((record) =>
                record.suit === formData.suitNo
                    ? {
                        ...record,
                        description: formData.description || record.description,
                        received: (parseFloat(record.received) + (isAdding ? amountValue : -amountValue)).toString(),
                        dueAmount: (parseFloat(record.dueAmount) + (isAdding ? amountValue : -amountValue)).toString(),
                        shopName: formData.shopName || record.shopName,
                        tagNo: formData.tagNo || record.tagNo,
                        details: formData.details || record.details,
                    }
                    : record
            )
        );

        if (isAdding) {
            setIsOpenAdd(false);
            setFormDataAdd({ billNo: "", suitNo: "", description: "", amount: "", order: "", shopName: "", tagNo: "", details: "", currentPayment: "" });
        } else {
            setIsOpenLess(false);
            setFormDataLess({ billNo: "", suitNo: "", description: "", amount: "", order: "", shopName: "", tagNo: "", details: "", currentPayment: "" });
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;

        setForms((prevForms) => {
            const updatedForms = prevForms.map((form, i) =>
                i === index ? { ...form, [name]: value } : form
            );

            if (["rate", "quantity", "advancePayment"].includes(name)) {
                const rate = parseFloat(updatedForms[index].rate) || 0;
                const quantity = parseFloat(updatedForms[index].quantity) || 0;
                const advance = parseFloat(updatedForms[index].advancePayment) || 0;
                const due = rate * quantity - advance;

                updatedForms[index].dueAmount = due % 1 === 0 ? due.toString() : due.toFixed(2);
            }

            return updatedForms;
        });
    };

    const handleAddForm = () => {
        setForms([
            ...forms,
            {
                suit: `S-${lastSuitNumber + forms.length}`,
                tag: "",
                kariger: "",
                quantity: "",
                description: "",
                received: "",
                paymentType: "",
                advancePayment: "",
                dueAmount: "",
                currentPayment: "",
                rate: "",
            },
        ]);
    };

    const handleRemoveForm = (index) => {
        if (forms.length === 1) return;
        setForms(forms.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!name.trim()) {
            alert("Please enter a name!");
            return;
        }
    
        if (!phone.trim()) {
            alert("Please enter a phone number!");
            return;
        }
    
        if (!bill.trim()) {
            alert("Please enter a bill number!");
            return;
        }
    
        const isValid = forms.every((form) => {
            const requiredFields = ["kariger", "description"];
            if (requiredFields.some((field) => !form[field]?.trim())) return false;
    
            if (form.paymentType === "Advance") {
                if (!form.advancePayment?.trim() || !form.dueAmount?.trim()) {
                    return false;
                }
            }
    
            if (form.paymentType === "Final Pay") {
                if (!form.received?.trim() || !form.currentPayment?.trim()) {
                    return false;
                }
            }
    
            if (form.payment === "Bank" && !form.bank?.trim()) {
                return false;
            }
    
            return true;
        });
    
        if (!isValid) {
            alert("Please fill all required fields correctly.");
            return;
        }
    
        const newRecords = forms.map((form, index) => {
            // If editing, retain the original suit value
            const originalRecord = editIndex !== null ? records[editIndex] : null;
    
            return {
                ...form,
                name: name.trim(),
                phone: phone.trim(),
                billNo: bill.trim(),
                sale: sale.trim(),
                date: date.trim(),
                suit: originalRecord ? originalRecord.suit : `S-${lastSuitNumber + index}`, // Use original suit if editing
                paymentType: form.paymentType || "-",
                advancePayment: form.advancePayment?.trim() || "-",
                dueAmount: form.dueAmount?.trim() || "-",
                received: form.received?.trim() || "-",
                currentPayment: form.currentPayment?.trim() || "-",
                bank: form.bank?.trim() || "-",
            };
        });
    
        console.log('New records being created:', newRecords);
    
        if (editIndex !== null) {
            const updatedRecords = [...records];
            updatedRecords[editIndex] = newRecords[0];
            setRecords(updatedRecords);
            setEditIndex(null);
        } else {
            setRecords([...records, ...newRecords]);
            setLastSuitNumber(lastSuitNumber + forms.length); // Increment only if not editing
        }
    
        // Reset the form
        setForms([{
            suit: `S-${lastSuitNumber + forms.length}`,
            tag: "",
            kariger: "",
            quantity: "",
            description: "",
            received: "",
            paymentType: "",
            advancePayment: "",
            dueAmount: "",
            currentPayment: "",
            rate: "",
        }]);
    };

    const handleCancelConfirm = () => {
        setSale("Sales Man 1");
        setName("Customer1");
        setPhone("03123456789");
        setBill("10");
        setDate(formattedToday);
        setForms([{
            suit: `S-1`,
            tag: "",
            kariger: "",
            quantity: "",
            description: "",
            received: "",
            paymentType: "",
            advancePayment: "",
            dueAmount: "",
            payment: "",
            bank: "",
            currentPayment: "",
            rate: "",
        }]);
        setIsOpenCancel(false);
    };
    

    return (
        <div className="p-6 w-full max-h-[100vh] relative mb-10 flex">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-center mb-6">Customer</h2>
                <div className="flex items-center justify-center mb-5">
                    <button
                        className="bg-purple-200 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
                        onClick={() => setShowMeasurement((prev) => !prev)}
                    >
                        Measurements
                    </button>

                    <button
                        className="bg-purple-200 ml-5 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
                        onClick={() => setIsOpenCancel(true)}
                    >
                        Cancel
                    </button>

                    <button
                        className="bg-purple-200 ml-5 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
                        onClick={() => setIsOpenAdd(true)}
                    >
                        Add
                    </button>

                    <button
                        className="bg-purple-200 ml-5 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
                        onClick={() => setIsOpenLess(true)}
                    >
                        Less
                    </button>
                    <button
                        className="bg-purple-200 hover:bg-purple-300 ml-5 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
                        onClick={handleAddForm}
                    >
                        +
                    </button>
                </div>

                <div className="flex items-center justify-between mb-5">
                    <div className="w-1/5 mx-2">
                        <label className="block text-gray-700 font-medium">Sales man</label>
                        <input
                            type="text"
                            name="saleman"
                            value={sale}
                            onChange={(e) => setSale(e.target.value)}
                            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    <div className="w-1/5 mx-2">
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                            placeholder="Enter Name"
                            required
                        />
                    </div>

                    <div className="w-1/5 mx-2">
                        <label className="block text-gray-700 font-medium">Bill No</label>
                        <input
                            type="text"
                            name="bill"
                            value={bill}
                            onChange={(e) => setBill(e.target.value)}
                            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                            placeholder="Enter Bill No"
                            required
                        />
                    </div>

                    <div className="w-1/5 mx-2">
                        <label className="block text-gray-700 font-medium">Phone No:</label>
                        <input
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                        />
                    </div>

                    <div className="w-1/5 mx-2">
                        <label className="block text-gray-700 font-medium">Date</label>
                        <input
                            type="text"
                            name="date"
                            value={date}
                            disabled
                            className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
                        />
                    </div>
                </div>

                {forms.map((form, index) => (
                    <OrderForm
                        key={index}
                        formData={form}
                        index={index}
                        handleChange={handleChange}
                        handleRemoveForm={handleRemoveForm}
                    />
                ))}

                <div className="flex justify-center">
                    <button
                        className="mt-6 w-[20%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-300 transition-all duration-200"
                        onClick={handleSubmit}
                    >
                        {editIndex !== null ? "Update" : "Save Record"}
                    </button>
                </div>
            </div>

            <Modal
                title="Add"
                isOpen={isOpenAdd}
                onClose={() => setIsOpenAdd(false)}
                formData={formDataAdd}
                handleChange={(e) => handleModalChange(e, setFormDataAdd)}
                onSubmit={() => handleSubmitAmountChange(true)}
                getSuitNumbers={getSuitNumbers}
            />

            <Modal
                title="Less"
                isOpen={isOpenLess}
                onClose={() => setIsOpenLess(false)}
                formData={formDataLess}
                handleChange={(e) => handleModalChange(e, setFormDataLess)}
                onSubmit={() => handleSubmitAmountChange(false)}
                getSuitNumbers={getSuitNumbers}
            />

            <CancelModal
                isOpen={isOpenCancel}
                onClose={() => setIsOpenCancel(false)}
                onConfirm={handleCancelConfirm}
            />
        </div>
    );
};

export default CustomerForm;