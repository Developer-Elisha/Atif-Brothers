import React, { useState } from 'react';

const Given = ({ records, setRecords, setIsGivenOpen }) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [billNo, setBillNo] = useState('');
  const [suitNo, setSuitNo] = useState('');
  const [karigerName, setKarigerName] = useState('');
  const [description, setDescription] = useState('');
  const [suitOptions, setSuitOptions] = useState([]);

  const handleBillNoChange = (e) => {
    const value = e.target.value;
    setBillNo(value);

    // Filter records based on the bill number
    const filteredRecords = records.filter(record => record.bill === value);
    
    if (filteredRecords.length > 0) {
      const suits = filteredRecords.map(record => record.suit); // Get all suit numbers
      setSuitOptions(suits);
      setKarigerName(filteredRecords[0].name); // Assuming the first match for kariger name
    } else {
      setSuitOptions([]);
      setKarigerName('');
    }
  };

  const handleSubmit = () => {
    if (!billNo || !suitNo || !karigerName) {
      alert("Please fill in all fields.");
      return;
    }

    const newRecord = {
      date: formattedDate,
      billNo,
      suit: suitNo,
      karigerName,
      description,
    };

    setRecords(prevRecords => [...prevRecords, newRecord]);
    // Reset fields after submission
    setBillNo('');
    setSuitNo('');
    setKarigerName('');
    setDescription('');
    setSuitOptions([]); // Clear suit options
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Given Details</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Date</label>
        <input
          type="text"
          value={formattedDate}
          disabled
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Bill No</label>
        <input
          type="text"
          value={billNo}
          onChange={handleBillNoChange}
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          placeholder="Enter Bill No"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Suit No</label>
        <select
          value={suitNo}
          onChange={(e) => setSuitNo(e.target.value)}
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
        >
          <option value="">Select Suit No</option>
          {suitOptions.map((suit, index) => (
            <option key={index} value={suit}>
              {suit}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Kariger Name</label>
        <input
          type="text"
          value={karigerName}
          readOnly
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-20 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          placeholder="Enter Description"
        />
      </div>

      <div className='flex justify-end'>
        
        <button
          className="bg-purple-300 text-black py-2 px-4 rounded-lg hover:bg-purple-400 w-30 mr-5"
          onClick={() => {
            setBillNo('');
            setSuitNo('');
            setIsGivenOpen(false);
          }}
        >
          Close
        </button>
        <button
          className="bg-purple-300 text-black py-2 px-4 rounded-lg hover:bg-purple-400 w-30"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Given;