import { forwardRef, useMemo, useState } from "react";
import CountriesAndCitiesList from "../lib/countriesList";
import { Input } from "./ui/input";
interface LocationInputProps extends React.HTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
  ({ onLocationSelected, ...props }, ref) => {
    const [locationSearched, setLocationSearched] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const CountriesCities = useMemo(() => {
      const userInput = locationSearched.split(" ");

      return CountriesAndCitiesList.map(
        (location) => `${location.name}, ${location.subcountry}`
      )
        .filter(
          (location) =>
            location.toLowerCase().startsWith(userInput[0].toLowerCase()) &&
            userInput.every((word) =>
              location.toLowerCase().includes(word.toLowerCase())
            )
        )
        .slice(0, 5);
    }, [locationSearched]);
    return (
      <div className="relative">
        <Input
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          ref={ref}
          {...props}
          value={locationSearched}
          onChange={(e) => setLocationSearched(e.target.value)}
        />
        {locationSearched.trim() && hasFocus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {CountriesCities?.map((country) => (
              <button
                key={country}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(country);
                  setLocationSearched("");
                }}
                className="block w-full p-2 text-start"
              >
                {country}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

LocationInput.displayName = "LocationInput";


export default LocationInput;
