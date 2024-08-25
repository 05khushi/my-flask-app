import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput,
      });
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!apiResponse) return null;
    const result = selectedOptions.map(option => {
      return (
        <div key={option.value}>
          <h3>{option.label}</h3>
          <p>{JSON.stringify(apiResponse[option.value], null, 2)}</p>
        </div>
      );
    });
    return result;
  };

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  return (
    <div className="App">
      <h1>Enter JSON Here...</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here...'
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {apiResponse && (
        <div>
          <h2>Select Options to Display:</h2>
          <Select
            isMulti
            name="options"
            options={options}
            onChange={handleSelectChange}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div>{renderResponse()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
