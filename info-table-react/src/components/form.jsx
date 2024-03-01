import { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    date: '',
    selection: 'contract',
  });

  const [tableData, setTableData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingIndex = tableData.findIndex(
      (item) => item.username === formData.username && item.surname === formData.surname && item.date === formData.date && item.selection === formData.selection
    );

    if (existingIndex !== -1) {
      // Update existing entry
      const updatedData = [...tableData];
      updatedData[existingIndex] = formData;
      setTableData(updatedData);
    } else {
      // Add new entry
      setTableData([...tableData, formData]);
    }

    setFormData({
      username: '',
      surname: '',
      date: '',
      selection: 'contract',
    });
  };

  const handleEdit = (index) => {
    const editedData = tableData[index];
    setFormData(editedData);
    setTableData(tableData.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-6">
        <div>
          <label htmlFor="username" className="block text-2xl font-medium text-gray-700">Username</label>
          <input id="username" name="username" type="text" className="py-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="surname" className="block text-2xl font-medium text-gray-700">Surname</label>
          <input id="surname" name="surname" type="text" className="py-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md" value={formData.surname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="date" className="text-2xl block font-medium text-gray-700">Date</label>
          <input id="date" name="date" type="date" className="py-4 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="selection" className="text-2xl block font-medium text-gray-700">Select Type</label>
          <select id="selection" name="selection" className="py-4 mt-1 block w-full pl-3 pr-10 text-base border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" value={formData.selection} onChange={handleChange} >
            <option value="contract">Contract</option>
            <option value="scholarship">Scholarship</option>
          </select>
        </div>
        <div>
          <button type="submit" className="py-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </div>
      </form>

      <table className="min-w-full bg-white shadow-md rounded mt-10">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-2 px-4">Full Name</th>
            <th className="text-left py-2 px-4">Birthday Date</th>
            <th className="text-left py-2 px-4">Selected Type</th>
            <th className="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {tableData.map((data, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{data.username} {data.surname}</td>
              <td className="border px-4 py-2">{data.date}</td>
              <td className="border px-4 py-2">{data.selection}</td>
              <td className="border px-2 py-2 ">
                <button onClick={() => handleEdit(index)} className="text-white border py-2 px-4 rounded-md bg-blue-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => handleDelete(index)} className="text-white border py-2 px-4 text-end rounded-md bg-red-600 hover:text-red-900 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormComponent;
