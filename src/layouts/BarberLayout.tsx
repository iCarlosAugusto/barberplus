import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { api } from "@/http/request";
import { Company } from "@/entities/Company";

export const BarberLayout = () => {
  const { barberSlug } = useParams<{ barberSlug: string }>();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!barberSlug) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/company/${barberSlug}`);
        setCompany(response.data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar dados da barbearia:", error);
        setError("Não foi possível carregar os dados da barbearia.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [barberSlug]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="barber-context">
        {company && (
          <div className="barber-header">
            <h1>{company.name}</h1>
            {/* Outros detalhes da barbearia que você queira mostrar */}
          </div>
        )}
        <Outlet context={{ company, barberSlug }} />
      </div>
    </>
  );
}; 