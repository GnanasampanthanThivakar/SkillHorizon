import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';




const ShowcasesPage  = () => {
 const [learningPlans, setLearningPlans] = useState({
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: []
  });
  const [showDropdown, setShowDropdown] = useState(null);
  const [showForm, setShowForm] = useState({ type: '', day: '' });
  const [formData, setFormData] = useState({ title: '', description: '', file: null });
  const [viewItem, setViewItem] = useState(null);

  const handleUploadClick = (day) => {
    setShowDropdown(day === showDropdown ? null : day);
  };

  const handleOptionSelect = (type, day) => {
    setShowForm({ type, day });
    setShowDropdown(null);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = () => { if (formData.title && formData.file) { const newItem = { ...formData, file: formData.file }; setLearningPlans((prev) => ({ ...prev, [showForm.day]: [...prev[showForm.day], newItem] })); setFormData({ title: '', description: '', file: null }); setShowForm({ type: '', day: '' }); } };

  const handleView = (item) => {
    setViewItem(item);
  };

  const handleCloseView = () => {
    setViewItem(null);
  };

  const renderFile = (file) => { if (!file) return null; const fileURL = URL.createObjectURL(file); const fileType = file.type; if (fileType.startsWith('image/')) { return <img src={fileURL} alt='Uploaded Content' className='w-full h-auto mb-2' />; } else { return <a href={fileURL} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline mb-2'>View Document</a>; } };

  const days = ['day1', 'day2', 'day3', 'day4', 'day5'];

  return (
    <div className="bg-white p-6 shadow rounded-xl max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Weekly Learning Plan</h2>

      <div className="flex gap-4 mb-6">
        {days.map((day, index) => (
          <div key={day} className="flex-1 bg-blue-50 p-2 rounded flex items-center justify-between relative">
            <span className="font-medium">Day {index + 1}</span>
            <button onClick={() => handleUploadClick(day)} className="text-blue-600">
              <Plus size={16} />
            </button>
            {showDropdown === day && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow rounded p-2">
                <button onClick={() => handleOptionSelect('image', day)} className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                  Upload Image
                </button>
                <button onClick={() => handleOptionSelect('document', day)} className="block w-full text-left px-2 py-1 hover:bg-gray-100">
                  Upload Document
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showForm.type && (
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h3 className="font-bold mb-2">Upload {showForm.type}</h3>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">{day.toUpperCase()}</h3>
            {learningPlans[day].length > 0 ? (
              learningPlans[day].map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-2 mb-2 rounded">
                  <span>{item.title}</span>
                  <div className="flex gap-2">
                    <Eye className="text-blue-600 cursor-pointer" size={16} onClick={() => handleView(item)} />
                    <Edit2 className="text-yellow-500 cursor-pointer" size={16} />
                    <Trash2 className="text-red-600 cursor-pointer" size={16} />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items added yet.</p>
            )}
          </div>
        ))}
      </div>

      {viewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="font-bold mb-2">{viewItem.title}</h3>
            <p className="mb-2">{viewItem.description}</p>
            {renderFile(viewItem.file)}
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCloseView}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowcasesPage ;
