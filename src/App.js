import Species from "./components/Species/Species";
import NewSpecies from "./components/NewSpecies/NewSpecies";

const App = () => {
  const species = [
    {
      id: "s1",
      name: "Koala",
      status: "Approved",
      date: new Date(2020, 9, 17),
    },
    {
      id: "s1",
      name: "Wallaby",
      status: "Approved",
      date: new Date(2021, 2, 16),
    },
    {
      id: "s1",
      name: "Blue Tongue Lizard",
      status: "Pending",
      date: new Date(2021, 5, 14),
    },
    {
      id: "s1",
      name: "Brisbane River Turtle",
      status: "Pending",
      date: new Date(2020, 3, 24),
    },
  ];

  const addSpeciesHandler = species => {
    console.log(species);
  }

  return (
    <div>
      <NewSpecies onAddSpecies={addSpeciesHandler}/>
      <Species animals={species} />
    </div>
  );
}

export default App;
