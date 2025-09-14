import { useEffect, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

type DeliveryMapProps = {
  userAddress: string;
  setUserAddress: (addr: string) => void;
  userCoordinates: { lat: number; lng: number };
  setUserCoordinates: (coords: { lat: number; lng: number }) => void;
  shopCoordinates: { lat: number; lng: number };
  errors: { address?: string };
};

export const DeliveryMap = ({
  userAddress,
  setUserAddress,
  userCoordinates,
  setUserCoordinates,
  shopCoordinates,
  errors,
}: DeliveryMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAzbGq6Y9XAjZ5G1HiBwtV1lfeVgX7NZfo",
  });

  const fetchCoordinates = async (address: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        setUserCoordinates({ lat: location.lat(), lng: location.lng() });
      }
    });
  };

  const fetchAddress = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setUserAddress(results[0].formatted_address);
      }
    });
  };

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setUserCoordinates({ lat, lng });
        fetchAddress(lat, lng);
      }
    },
    [setUserCoordinates, setUserAddress]
  );

  useEffect(() => {
    if (userAddress.trim() !== "") {
      fetchCoordinates(userAddress);
    }
  }, [userAddress]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col">
        <span className="mb-1 font-medium">Address:</span>
        <input
          name="address"
          type="text"
          className={`border rounded-md p-2 ${
            errors.address ? "border-red-500" : ""
          }`}
          placeholder="Delivery address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        {errors.address && (
          <span className="text-sm text-red-600">{errors.address}</span>
        )}
      </label>

      <GoogleMap
        center={userCoordinates}
        zoom={12}
        mapContainerStyle={{ width: "100%", height: "300px" }}
        onClick={handleMapClick}
      >
        <Marker
          position={userCoordinates}
          draggable
          onDragEnd={(e) => {
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();
            if (lat && lng) {
              setUserCoordinates({ lat, lng });
              fetchAddress(lat, lng);
            }
          }}
        />

        <Marker position={shopCoordinates} label="Shop" />
      </GoogleMap>
    </div>
  );
};
