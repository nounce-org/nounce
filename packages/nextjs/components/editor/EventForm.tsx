import React from "react";

const EventForm: React.FC<{ onChange: (data: any) => void }> = ({ onChange }) => {
  return (
    <div>
      <label>
        Location: <input type="text" onChange={e => onChange({ location: e.target.value })} />
      </label>
      <label>
        Start Date: <input type="date" onChange={e => onChange({ startDate: e.target.value })} />
      </label>
      <label>
        End Date: <input type="date" onChange={e => onChange({ endDate: e.target.value })} />
      </label>
    </div>
  );
};

export default EventForm;
