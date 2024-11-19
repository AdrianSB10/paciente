import React, { useEffect, useState } from 'react';
import PacienteForm from './components/PacienteForm';
import PacienteList from './components/PacienteList';
import { Paciente } from './types';
import './App.css';

const App: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [currentPaciente, setCurrentPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    fetch('/clinicadental/pacientes')
      .then(response => response.json())
      .then(data => setPacientes(data));
  }, []);

  const addPaciente = (paciente: Omit<Paciente, 'id'>) => {
    fetch('/clinicadental/pacientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    })
      .then(response => response.json())
      .then(newPaciente => setPacientes([...pacientes, newPaciente]));
  };

  const updatePaciente = (paciente: Paciente) => {
    fetch(`/clinicadental/pacientes/${paciente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    })
      .then(response => response.json())
      .then(updatedPaciente => {
        setPacientes(pacientes.map(p => (p.id === updatedPaciente.id ? updatedPaciente : p)));
        setCurrentPaciente(null);
      });
  };

  const deletePaciente = (id: number) => {
    fetch(`/clinicadental/pacientes/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setPacientes(pacientes.filter(paciente => paciente.id !== id));
    });
  };

  const editPaciente = (paciente: Paciente) => {
    setCurrentPaciente(paciente);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Pacientes</h1>
      <div className="row">
        <div className="col-md-6">
          <PacienteForm onAddPaciente={addPaciente} onUpdatePaciente={updatePaciente} currentPaciente={currentPaciente} />
        </div>
        <div className="col-md-6">
          <PacienteList pacientes={pacientes} onEdit={editPaciente} onDelete={deletePaciente} />
        </div>
      </div>
    </div>
  );
};

export default App;