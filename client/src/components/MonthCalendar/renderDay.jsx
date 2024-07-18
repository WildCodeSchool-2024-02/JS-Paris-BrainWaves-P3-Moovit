import * as datefns from "date-fns";
import { PickersDay } from "@mui/x-date-pickers/PickersDay/PickersDay";

const renderDay = ({
  interval,
  day,
  outsideCurrentMonth,
  selected,
  ...other
}) => {
  const newDate = parseInt(datefns.format(day, "yyyy-MM-dd").slice(8.1), 10);
  const isSelected = !outsideCurrentMonth && interval.includes(newDate);
  return (
    <PickersDay
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      sx={{
        border: isSelected ? " solid var(--second)" : "",
        backgroundColor: selected ? "var(--second)" : "",
      }}
    />
  );
};

export default renderDay;
