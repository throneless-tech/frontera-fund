import React, { useState } from "react";
import { setHours, setMinutes } from "date-fns";
import { useDynamicImport } from "@/lib/utils/dynamicImport";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export function DateSelect(props: any) {
  const ReactDatePicker =
    useDynamicImport<typeof import("react-datepicker").default>(
      "react-datepicker",
    );
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16),
  );

  if (!ReactDatePicker) {
    return null;
  }

  return (
    <ReactDatePicker
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      selected={selectedDateTime}
      onChange={setSelectedDateTime}
      popperPlacement="bottom-end"
      popperClassName="datetime-popper"
    />
  );
}
