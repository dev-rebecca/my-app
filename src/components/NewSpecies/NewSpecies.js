import SpeciesForm from "./SpeciesForm";
import "./NewSpecies.css";

const NewSpecies = (props) => {

  const saveSpeciesDataHandler = (enteredSpeciesData) => {
    const speciesData = {
      ...enteredSpeciesData,
      id: Math.random().toString()
    };
    props.onAddSpecies(speciesData);
  }

  return (
    <div className="new-expense">
      <SpeciesForm onSaveSpeciesData={saveSpeciesDataHandler} />
    </div>
  );
};

export default NewSpecies;
