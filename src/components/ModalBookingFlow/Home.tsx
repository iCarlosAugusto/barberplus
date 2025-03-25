import { useEffect, useRef, useState } from "react";
import { BeautyDatePicker } from "@/components/InlineCalendar";
import { useBookingStore } from "@/store/bookingStore";
import { api } from "@/http/request";
import { addMinutesToTime } from "@/utils/addMinutesToTime";
import { minutesToHoursFormatter } from "@/utils/minutesToHours";
import { useCompanyStore } from "@/store/companyStore";
import { Job } from "@/entities/Job";
import { format, isToday, parse } from "date-fns";
import { AxiosError } from "axios";
import { JobCard } from "@/components/JobCard";
import { changeHoursEmitter } from "@/events/ChangeHoursEmitter";

export function Home({ firstJob }: { firstJob: Job }) {
  const { jobSchedule, goToServices, addJob } = useBookingStore();
  const { company } = useCompanyStore();
  const currentDateSelectedRef = useRef<Date>(new Date());

  const [selectedPeriod, setSelectedPeriod] = useState<string>("Manhã");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [availableHoursSlot, setAvailableHoursSlot] = useState<string[]>([]);
  const [isCompanyAvailable, setIsCompanyAvailable] = useState<boolean | null>(
    null
  );

  const getTimesByPeriod = () => {
    switch (selectedPeriod) {
      case "Manhã":
        return availableHoursSlot;
      case "Tarde":
        return availableHoursSlot;
      case "Noite":
        return availableHoursSlot;
      default:
        return availableHoursSlot;
    }
  };

  const updateFirstJob = (timeSlot: string) => {
    setSelectedTime(timeSlot);
    const startTimeTeste = parse(
      timeSlot,
      "HH:mm",
      currentDateSelectedRef.current
    );
    const endTimeTeste = parse(
      addMinutesToTime(
        timeSlot,
        minutesToHoursFormatter(firstJob.durationMinutes)
      ),
      "HH:mm",
      currentDateSelectedRef.current
    );
    addJob({
      job: firstJob,
      employee: null,
      date: currentDateSelectedRef.current,
      startTime: startTimeTeste,
      endTime: endTimeTeste,
    });
  };

  const fetchCompanyTimeSlots = async (date: Date) => {
    const datePickedFormatted = format(date, "yyyy-MM-dd");
    const dayOfWeek = format(date, "EEEE").toUpperCase();
    const hours = isToday(date)
      ? format(date, "HH:mm")
      : company?.workSchedule.find(
          (schedule) => schedule.dayOfWeek === dayOfWeek
        )?.startTime;

    setIsLoading(true);
    try {
      const { data } = await api.get(
        `/companies/${company?.id}/time-slots?date=${datePickedFormatted}&hours=${hours}`
      );
      setAvailableHoursSlot(data);
      setSelectedTime(data[0]);
      if (!jobSchedule) {
        updateFirstJob(data[0]);
      }
      setIsCompanyAvailable(true);
    } catch (error) {
      console.log(error instanceof AxiosError);
      if (error instanceof AxiosError && error.status === 400) {
        console.log("caiu no if: ");
        setIsCompanyAvailable(false);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeHour = (timeSlot: string) => {
    setSelectedTime(timeSlot);
    changeHoursEmitter.emit("changeHours", timeSlot);
  };

  useEffect(() => {
    fetchCompanyTimeSlots(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && <div>Carregando...</div>}
      <BeautyDatePicker
        onDateSelect={(date) => {
          currentDateSelectedRef.current = date;
          fetchCompanyTimeSlots(date);
        }}
      />

      {!isCompanyAvailable && !isLoading && (
        <div className="p-4 border-b">
          <div className="text-red-500">
            A empresa não está disponível nesse horário
          </div>
        </div>
      )}

      {!isLoading && selectedTime && isCompanyAvailable && (
        <>
          <div className="p-4 border-b">
            <div className="grid grid-cols-3 gap-2">
              {["Manhã", "Tarde", "Noite"].map((period) => (
                <button
                  key={period}
                  className={`py-2 px-4 rounded-md ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="p-4 border-b">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {getTimesByPeriod().map((time) => (
                <button
                  key={time}
                  className={`py-2 px-4 rounded-md flex-shrink-0 ${
                    selectedTime === time
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleChangeHour(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Service Summary */}
          <div className="p-4 bg-gray-50">
            {jobSchedule?.jobs.map((jobElement, index) => (
              <JobCard key={index} jobElement={jobElement} index={index} />
            ))}

            <div className="flex justify-between items-center border-t pt-4">
              <div>
                <span className="text-gray-600">Total:</span>
                <span className="text-xl font-bold ml-2">R$ {"TODO"}</span>
                <span className="text-gray-500 text-sm ml-2">1h</span>
              </div>

              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => {
                  alert("Reserva confirmada!");
                }}
              >
                Continuar
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                className="text-blue-600 flex items-center justify-center mx-auto"
                onClick={() => {
                  goToServices();
                }}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Adicionar outro serviço
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
