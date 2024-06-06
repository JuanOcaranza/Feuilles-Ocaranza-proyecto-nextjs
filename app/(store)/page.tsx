import HomeCarousel from "@/components/home-carousel";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-screen">
        <img src="/images/home-banner.png" alt="Main Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="bg-black bg-opacity-75 p-4 mb-4 rounded">
            <h1 className="text-4xl lg:text-6xl font-bold text-white text-center">
              Welcome to Surprise Boxes!
            </h1>
          </div>
          <button className="bg-white text-black font-semibold hover:bg-black hover:text-white py-2 px-4 text-lg rounded-lg border-2 border-black mt-4">
            BUY NOW
          </button>
        </div>
      </div>
      <div className="py-10 bg-gray-100">
        <div className="container mx-auto">
          <HomeCarousel products={[]} />
        </div>
      </div>
    </div>
  );
}
