import React, { useState, useEffect } from 'react';
import { Paciente } from '../types';

interface PacienteFormProps {
  onAddPaciente: (paciente: Omit<Paciente, 'id'>) => void;
  onUpdatePaciente: (paciente: Paciente) => void;
  currentPaciente: Paciente | null;
}

const PacienteForm: React.FC<PacienteFormProps> = ({ onAddPaciente, onUpdatePaciente, currentPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (currentPaciente) {
      setNombre(currentPaciente.nombre);
      setApellido(currentPaciente.apellido);
      setFechaNacimiento(currentPaciente.fechaNacimiento);
      setTelefono(currentPaciente.telefono);
    }
  }, [currentPaciente]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPaciente) {
      onUpdatePaciente({ id: currentPaciente.id, nombre, apellido, fechaNacimiento, telefono });
    } else {
      onAddPaciente({ nombre, apellido, fechaNacimiento, telefono });
    }
    setNombre('');
    setApellido('');
    setFechaNacimiento('');
    setTelefono('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Apellido:</label>
        <input
          type="text"
          className="form-control"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha de Nacimiento:</label>
        <input
          type="date"
          className="form-control"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Teléfono:</label>
        <input
          type="text"
          className="form-control"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {currentPaciente ? 'Actualizar Paciente' : 'Agregar Paciente'}
      </button>
    </form>
  );
};

export default PacienteForm;