import image from "./assets/image.jpg";
import Weather from "./components/Weather";

function App() {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex space-x-2 justify-around px-4 py-2 w-full">
        <div className="flex flex-col w-full basis-2/3 space-y-5">
          <div className="bg-blue-200 h-[50vh] rounded-lg ">
            <div>
              <Weather />
            </div>
          </div>
          <div className="bg-blue-400 h-[40vh] rounded-lg ">WINDOW 2</div>
        </div>
        <div className="flex flex-col basis-1/3 space-y-5">
          <div className="bg-blue-500 h-[30vh] rounded-lg ">WINDOW3</div>
          <div className="bg-blue-600 h-[30vh] rounded-lg ">WINDOW4</div>
          <div className="bg-blue-700 h-[30vh] rounded-lg ">WINDOW5</div>
        </div>
      </div>
    </div>
  );
}

export default App;
