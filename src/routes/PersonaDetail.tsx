import { useParams } from "react-router";

const PersonaDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-4 pt-0">
      <h1 className="mb-4 text-2xl font-bold">Persona Details</h1>
      <p>Persona ID: {id}</p>
      {/* Add your persona detail content here */}
    </div>
  );
};

export default PersonaDetail;
