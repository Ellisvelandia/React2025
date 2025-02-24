import Card from "./components/Card";

function App() {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Hello, Tailwind CSS!
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1  gap-4 mt-4">
          <Card title="kung fu panda" rating={4} actors={["Actor 1", "Actor 2"]} />
          <Card title="matrix" ratinmg={5} actors={["Actor 1", "Actor 2"]} />
          <Card title="avatar" rating={3} actors={["Actor 1", "Actor 2"]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
