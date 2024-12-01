
import Home from "./Pages/Home";

function AppLayout() {
  return (
    <div className=" w-full h-screen ">
      <img
        className="w-full h-screen  object-cover"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/c5310f182519763.652f3606b64b0.jpg"
        alt=""
      />

      <div className="bg-white p-8  w-full fixed bottom-0 ">
        <h2 className="font-semibold text-2xl">Getting Started With Uber</h2>

        <button className="w-full bg-black text-white font-semibold rounded py-2 mt-8">
          Continue
        </button>
      </div>
    </div>
  );
}

export default AppLayout;
