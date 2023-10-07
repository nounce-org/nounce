import React from "react";

type EventFormData = {
  location?: string;
  startDate?: string;
  endDate?: string;
};

const EventForm: React.FC<{ onChange: (data: (prev: EventFormData) => EventFormData) => void }> = ({ onChange }) => {
  const handleInputChange = (field: keyof EventFormData, value: string) => {
    onChange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full flex flex-col">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={e => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Start date</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={e => handleInputChange("startDate", e.target.value)}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">End date</span>
        </label>
        <input
          type="date"
          placeholder="Type here"
          className="input input-bordered w-full"
          onChange={e => handleInputChange("endDate", e.target.value)}
        />
      </div>
    </div>
  );
};

export default EventForm;
