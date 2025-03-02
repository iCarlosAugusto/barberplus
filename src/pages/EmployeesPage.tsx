import React, { useEffect, useState } from 'react';
import { Employee } from '../entities/Employee';

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Aqui você pode fazer uma chamada API para buscar funcionários
    // Por enquanto, vamos usar dados de exemplo
    const fetchEmployees = async () => {
      try {
        // Simulando uma chamada API
        setTimeout(() => {
          const dummyEmployees: Employee[] = [
            { id: 1, name: 'João Silva', role: 'Cabeleireiro' },
            { id: 2, name: 'Maria Oliveira', role: 'Manicure' },
            { id: 3, name: 'Pedro Santos', role: 'Barbeiro' },
          ];
          setEmployees(dummyEmployees);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div>Carregando funcionários...</div>;
  }

  return (
    <div className="employees-page">
      <h1>Nossos Profissionais</h1>
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