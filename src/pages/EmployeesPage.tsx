import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Employee } from '@/entities/Employee';
import { api } from '@/http/request';

type BarberContext = {
  company: any;
  barberSlug: string;
};

const EmployeesPage: React.FC = () => {
  const { barberSlug } = useParams<{ barberSlug: string }>();
  const context = useOutletContext<BarberContext>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Use o slug da URL ou do contexto (para rotas aninhadas)
  const slug = barberSlug || context?.barberSlug;

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/company/${slug}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        // Fallback para dados de exemplo se a API falhar
        const dummyEmployees: Employee[] = [
          { id: 1, name: 'João Silva', role: 'Cabeleireiro' },
          { id: 2, name: 'Maria Oliveira', role: 'Manicure' },
          { id: 3, name: 'Pedro Santos', role: 'Barbeiro' },
        ];
        setEmployees(dummyEmployees);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [slug]);

  if (loading) {
    return <div>Carregando funcionários...</div>;
  }

  return (
    <div className="employees-page">
      <h2>Nossos Profissionais</h2>
      {slug && <p>Barbearia: {slug}</p>}
      
      <div className="employees-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.name}</h3>
            <p>Função: {employee.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage; 