import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export function DateSelect(props: any) {
  const [apptDate, setApptDate] = useState(new Date());
  return (
    <DatePicker
      showTimeSelect
      selected={apptDate}
      onChange={(date: any) => setApptDate(date)}
      popperPlacement="bottom-end"
      popperClassName="datetime-popper"
    />
  );
};
