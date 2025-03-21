import { api } from "@/http/request";
import { useBookingStore } from "@/store/bookingStore";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";

interface EmployeeTimeSlot {
  employeeId: string;
  timeSlot: string[];
}

export function AvailableEmployees() {
  const { currentJobChangeEmployee, jobSchedule } = useBookingStore();

  const currentJob = jobSchedule?.jobs.find(
    (job) => job.job.id === currentJobChangeEmployee?.id
  );
  const [employeeTimeSlots, setEmployeeTimeSlots] = useState<
    EmployeeTimeSlot[]
  >([]);

  const fetchAvailableTimeByEmployee = async () => {
    const employees = currentJob?.job.doneByEmployees;

    if (!employees) return;
    for (const employee of employees) {
      try {
        const { data } = await api.get(
          `/employees/${employee.id}/time-slots?date=${formatDate(
            jobSchedule!.date
          )}`
        );
        const elEmployeeTimeSlots: EmployeeTimeSlot = {
          employeeId: employee.id,
          timeSlot: data,
        };
        setEmployeeTimeSlots((oldState) => [...oldState, elEmployeeTimeSlots]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchAvailableTimeByEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function verifyTimeSlot(
    arrayHours: string[] | undefined,
    startDate: string,
    endDate: string
  ) {
  
    function converteParaMinutos(hora: string) {
      const [horas, minutos] = hora.split(":").map(Number);
      return horas * 60 + minutos;
    }

    const startDateInMinutes = converteParaMinutos(startDate);
    const endDateInMinutes = converteParaMinutos(endDate);

    for (
      let minutes = startDateInMinutes;
      minutes <= endDateInMinutes;
      minutes += 10
    ) {
      const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
      const mins = (minutes % 60).toString().padStart(2, "0");
      const currentHour = `${hours}:${mins}`;

      if (!arrayHours?.includes(currentHour)) {
        return false;
      }
    }

    return true;
  }

  return (
    <>
      {currentJob?.job.doneByEmployees.map((employee) => (
        <div key={employee.id} className="flex flex-row justify-between">
          <h3>{employee.name}</h3>
          <span>
            {
              verifyTimeSlot(
                employeeTimeSlots.find((el) => el.employeeId === employee.id)?.timeSlot,
                formatDate(currentJob.startTime),
                formatDate(currentJob.endTime)
              ) ? "Disponível" : "Indisponível"
            }
          </span>
        </div>
      ))}
    </>
  );
}
