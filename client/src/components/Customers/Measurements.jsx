import React, { useState, useEffect } from "react";

const MeasurementForm = ({ setShowMeasurementForm, setMeasurementsRecords, customerRecords }) => {
  const [billNo, setBillNo] = useState("");
  const [suitNo, setSuitNo] = useState(""); // Changed to a single suit number
  const [suitOptions, setSuitOptions] = useState([]); // Options for the suit dropdown
  const [selectedOption, setSelectedOption] = useState("both");

  const [measurements, setMeasurements] = useState({
    shirtMaxi: {
      length: "",
      shoulder: "",
      chest: "",
      waist: "",
      hip: "",
      daman: "",
      sleeves: "",
      bicep: "",
      mori: "",
      armHole: "",
      backLength: "",
    },
    trouserSharara: {
      length: "",
      thigh: "",
      bottom: "",
      palta: "",
      clutch: "",
      inner: "",
      balls: "No",
    },
  });

  // Effect to update suitOptions based on billNo
  useEffect(() => {
    if (billNo) {
      const suits = customerRecords.filter(record => record.bill === billNo);
      setSuitOptions(suits.map(suit => suit.suit)); // Collect all suit numbers
    } else {
      setSuitOptions([]); // Reset if billNo is empty
    }
  }, [billNo, customerRecords]);

  const handleChange = (section, field, value) => {
    setMeasurements((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSuitChange = (e) => {
    setSuitNo(e.target.value); // Set the selected suit number
  };

  const handleSubmit = () => {
    if (!billNo.trim()) {
      alert("Please enter a valid Bill No.");
      return;
    }

    if (!suitNo) {
      alert("Please select a Suit No.");
      return;
    }

    const newRecord = { billNo, suitNo, measurements };
    setMeasurementsRecords((prev) => [...prev, newRecord]);

    // Reset form fields
    setBillNo("");
    setSuitNo("");
    setMeasurements({
      shirtMaxi: {
        length: "",
        shoulder: "",
        chest: "",
        waist: "",
        hip: "",
        daman: "",
        sleeves: "",
        bicep: "",
        mori: "",
        armHole: "",
        backLength: "",
      },
      trouserSharara: {
        length: "",
        thigh: "",
        bottom: "",
        palta: "",
        clutch: "",
        inner: "",
        balls: "No",
      },
    });

    setShowMeasurementForm(false); // Close the form
  };

  return (
    <div className="w-full max-w-lg p-6">
      <h3 className="text-lg font-bold mb-4 text-center">Measurement Form</h3>

      <div className="flex space-x-2 mb-3">
        {/* Bill No Input */}
        <div className="flex-1">
          <label className="block font-semibold text-gray-700">Bill No:</label>
          <input
            type="text"
            value={billNo}
            onChange={(e) => setBillNo(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter Bill No"
            aria-label="Bill Number"
          />
        </div>

        {/* Suit No Selection */}
        <div className="flex-1">
          <label className="block">Suit No:</label>
          <select
            name="suitNo"
            value={suitNo}
            onChange={handleSuitChange}
            className="w-full p-2 border rounded"
            aria-label="Select Suit No"
          >
            <option value="">Select Suit No</option>
            {suitOptions.map((suit, index) => (
              <option key={index} value={suit}>{suit}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Select Dropdown for Measurement Type */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Select Type:</label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border p-2 rounded"
          aria-label="Select Measurement Type"
        >
          <option value="shirtMaxi">Shirt / Maxi</option>
          <option value="trouserSharara">Trouser / Sharara</option>
          <option value="both">Both</option>
        </select>
      </div>

      {/* Shirt/Maxi Measurements */}
      {(selectedOption === "shirtMaxi" || selectedOption === "both") && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 border-b pb-1">Shirt / Maxi</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(measurements.shirtMaxi).map(([key, value]) => (
              <div key={key}>
                <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={value}
                  onChange={(e) => handleChange("shirtMaxi", key, e.target.value)}
                  aria-label={`Shirt Maxi ${key}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trouser/Sharara Measurements */}
      {(selectedOption === "trouserSharara" || selectedOption === "both") && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 border-b pb-1">Trouser / Sharara</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(measurements.trouserSharara)
              .filter(([key]) => key !== "balls") // Exclude "balls" from grid
              .map(([key, value]) => (
                <div key={key}>
                  <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={value}
                    onChange={(e) => handleChange("trouserSharara", key, e.target.value)}
                    aria-label={`Trouser Sharara ${key}`}
                  />
                </div>
              ))}
          </div>

          {/* "Balls" should always be last */}
          <div className="mt-4">
            <label className="block text-gray-700">Balls</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="balls"
                  value="Yes"
                  checked={measurements.trouserSharara.balls === "Yes"}
                  onChange={(e) => handleChange("trouserSharara", "balls", e.target.value)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="balls"
                  value="No"
                  checked={measurements.trouserSharara.balls === "No"}
                  onChange={(e) => handleChange("trouserSharara", "balls", e.target.value)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-purple-200 text-black py-2 rounded cursor-pointer hover:bg-purple-300"
        aria-label="Submit Measurements"
      >
        Submit
      </button>

      {/* Close Button */}
      <button
        className="w-full bg-purple-200 text-black py-2 rounded cursor-pointer hover:bg-purple-300 mt-4"
        onClick={() => setShowMeasurementForm(false)}
        aria-label="Close Measurement Form"
      >
        Close
      </button>
    </div>
  );
};

export default MeasurementForm;