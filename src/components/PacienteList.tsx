import React from 'react';
import { Paciente } from '../types';

interface PacienteListProps {
  pacientes: Paciente[];
  onEdit: (paciente: Paciente) => void;
  onDelete: (id: number) => void;
}

const PacienteList: React.FC<PacienteListProps> = ({ pacientes, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-center mb-4">Lista de Pacientes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nombre}</td>
              <td>{paciente.apellido}</td>
              <td>{paciente.fechaNacimiento}</td>
              <td>{paciente.telefono}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => onEdit(paciente)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDelete(paciente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteList;