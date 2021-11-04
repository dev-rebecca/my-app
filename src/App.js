import Species from "./components/Species/Species";

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

  return (
    <div>
      <Species animals={species} />
    </div>
  );
}

export default App;
