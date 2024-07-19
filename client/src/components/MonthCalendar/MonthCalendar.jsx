import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import * as datefns from "date-fns";
import { Button, Box, Modal } from "@mui/material";
import { fr } from "date-fns/locale";
import "./monthcalendar.css";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/User/User";
import renderDay from "./renderDay";

export default function MonthCalendar({
  open,
  handleClose,
  setCurrentDate,
  setDayTraining,
  statusFeedback,
  statusTraining,
}) {
  const { user } = useUser();
  const [initialValue, setInitialValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [interval, setInterval] = useState([]);
  const firstDay = datefns.startOfMonth(initialValue);
  const lastDay = datefns.endOfMonth(initialValue);

  const getTraining = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/trainings/interval`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            firstDay: datefns.format(firstDay, "yyyy-MM-dd"),
            lastDay: datefns.format(lastDay, "yyyy-MM-dd"),
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const newData = [];
        data.forEach((t) => {
          if (!newData.includes(t.date)) {
            newData.push(parseInt(t.date.slice(8, 10), 10) + 1);
          }
        });
        setIsLoading(false);
        setInterval(newData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTraining();
  }, [initialValue, statusFeedback, statusTraining]);

  const handleMonthChange = (newMonth) => {
    setInitialValue(newMonth);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <section className="calendar-month-container">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <DateCalendar
              defaultValue={initialValue}
              value={initialValue}
              loading={isLoading}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{
                day: renderDay,
              }}
              slotProps={{
                day: {
                  interval,
                },
              }}
              onChange={(newValue) => {
                setCurrentDate(newValue);
                setInitialValue(newValue);
                setDayTraining(datefns.format(newValue, "yyyy-MM-dd"));
              }}
              sx={{
                backgroundColor: "var(--light)",
                scale: "1.3",
                borderRadius: "10px",
                ".MuiDateCalendar-root": {
                  position: "relative",
                },
                ".MuiPickersDay-root": {
                  boxShadow: "none",
                },
                ".MuiButtonBase-root": {
                  boxShadow: "none",
                },
                ".MuiPickersYear-yearButton": {
                  scale: "1",
                  fontSize: "0.8em",
                  boxShadow: "none",
                },
                ".Mui-selected": { backgroundColor: "var(--second)" },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              sx={{
                position: "absolute",
                bottom: "-40px",
                right: "-20px",
                backgroundColor: "var(--main)",
                ":hover": { backgroundColor: "var(--main)" },
              }}
            >
              Close
            </Button>
          </Box>
        </LocalizationProvider>
      </section>
    </Modal>
  );
}

MonthCalendar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setDayTraining: PropTypes.func.isRequired,
  statusFeedback: PropTypes.bool.isRequired,
  statusTraining: PropTypes.bool.isRequired,
};