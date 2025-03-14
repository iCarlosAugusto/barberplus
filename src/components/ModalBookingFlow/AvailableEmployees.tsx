import { api } from "@/http/request";
import { useBookingStore } from "@/store/bookingStore";
import { formatDate } from "@/utils/formatDate";
import { useEffect } from "react";


export function AvailableEmployees() {
  const { currentJobChangeEmployee, selectedJobs } = useBookingStore();

  const currentJob = selectedJobs.find((job) => job.job.id === currentJobChangeEmployee?.id);

  const fetchAvailableTimeByEmployee = async () => {

    const employees = currentJob?.job.doneByEmployees;
    
    if (!employees) return;
    for (const employee of employees) {
      try {
        const { data } = await api.get(`/employees/${employee.id}/time-slots?date=${formatDate(currentJob?.date)}`);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }


  useEffect(() => {
    fetchAvailableTimeByEmployee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <p>{JSON.stringify(currentJob)}</p>
    {currentJobChangeEmployee?.doneByEmployees.map((employee) => (
      <div key={employee.id}>
        <h3>{employee.name}</h3>
      </div>
    ))}
  </>;
}
