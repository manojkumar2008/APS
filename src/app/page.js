import Map from "@/shared/Map";
import SearchForm from "@/shared/SearchForm";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex flex-col sm:flex-row pt-12 lg:px-2 lg:pt-10 sm:pt-10 lg:pb-4" style={{height: "100vh"}}>
        <div className="form-container pr-0 lg:pr-2 sm:w-full md:w-[auto] lg:w-[auto] lg:mt-4">
          <SearchForm/>
        </div>
        <div className="hidden md:block lg:block map-container h-5/6 w-full sm:h-full sm:py-4 md:mr-2 lg:mr-0 md:h-[90vh] md:mt-0 lg:py-4 lg:h-full lg:w-full">
          <Map/>
        </div>
      </div>
    </>
  );
}
