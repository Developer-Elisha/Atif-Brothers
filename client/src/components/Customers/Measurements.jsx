import { useState } from "react";

const MeasurementForm = ({ setShowMeasurementForm }) => {
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
      balls: "",
      clutch: "",
      inner: "",
    },
  });

  const handleChange = (section, field, value) => {
    setMeasurements((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="w-full max-w-lg p-6">
      <h3 className="text-lg font-bold mb-4 text-center">Measurement Form</h3>

      {/* Select Dropdown */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Select Type:</label>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="w-full border p-2 rounded"
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
          {Object.keys(measurements.shirtMaxi).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={measurements.shirtMaxi[key]}
                onChange={(e) => handleChange("shirtMaxi", key, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Trouser/Sharara Measurements */}
      {(selectedOption === "trouserSharara" || selectedOption === "both") && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 border-b pb-1">Trouser / Sharara</h4>
          {Object.keys(measurements.trouserSharara).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={measurements.trouserSharara[key]}
                onChange={(e) => handleChange("trouserSharara", key, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Close Button */}
      <button
        className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        onClick={() => setShowMeasurementForm(false)}
      >
        Close
      </button>
    </div>
  );
};

export default MeasurementForm;
