import React, { useEffect, useState } from "react";
import ModalBookingFlow from "@/components/ModalBookingFlow";
import { useParams } from "react-router-dom";
import { api } from "@/http/request";
import { Job } from "@/entities/Job";
import { useBookingStore } from "@/store/bookingStore";
import { useCompanyStore } from "@/store/companyStore";

const ServicesPage: React.FC = () => {
  const { barberSlug } = useParams<{ barberSlug: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);  
  const [showModal, setShowModal] = useState<boolean>(false);
  const { company, setCompany } = useCompanyStore();
  const [jobs, setJobs] = useState<Job[]>([]);

  const { addJob } = useBookingStore();

  useEffect(() => {
    fetchCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async (companyId: string) => {
    const { data } = await api.get(`/companies/${companyId}/jobs`);
    setJobs(data);
  }

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`companies/slug/${barberSlug}`);
      await fetchJobs(data.id);
      setCompany(data);
    } catch (error) {
      setError(
        "Falha ao carregar dados da empresa. Por favor, tente novamente mais tarde."
      );
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = (job: Job) => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + job.durationMinutes * 60000);

    addJob({
      job: job,
      employee: null,
      startTime: startTime,
      endTime: endTime
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando serviços...
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="error-message bg-red-100 p-4 rounded text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Colorado Barbearia</h1>
        <p className="text-gray-600">
          Rua 238, QD40 lt 16 n 392, 74603-180, Goiânia
        </p>
      </header>

      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Serviços</h2>

      {/* All Service Categories */}
      {jobs.map((job) => (
        <div className="space-y-4">
          <div
            key={job.id}
            className="flex justify-between items-center p-3 hover:bg-gray-50 rounded"
          >
            <div>
              <h4 className="font-medium">{job.name}</h4>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <span className="font-bold mr-4">
                  R$ {job.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-600">30min</span>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => handleBookService(job)}
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Contact and Map Section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Localização e Contato
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="space-y-3">
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>{company.address}</span>
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>{company.phone}</span>
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>{company.email}</span>
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Horário de Funcionamento:</span>
              </p>
              <div className="ml-7 space-y-1">
                <p className="flex justify-between">
                  <span>Segunda - Sexta:</span>
                  <span>09:00 - 20:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Sábado:</span>
                  <span>09:00 - 18:00</span>
                </p>
                <p className="flex justify-between">
                  <span>Domingo:</span>
                  <span>Fechado</span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-pink-600 hover:text-pink-800">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            {/* Blue square simulating a map */}
            <div className="w-full h-80 bg-blue-500 rounded-lg shadow-md flex items-center justify-center">
              <div className="text-white text-center">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="font-semibold">{company.name}</p>
                <p className="text-sm">Mapa interativo indisponível</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm">
                Estamos localizados no coração de Goiânia, com fácil acesso e
                estacionamento próximo.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver no Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 pt-6 border-t text-center text-gray-600">
        <p>© 2024 Colorado Barbearia. Todos os direitos reservados.</p>
      </footer>

      {/* Booking Modal */}
      {showModal && (
        <ModalBookingFlow
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export { ServicesPage };
