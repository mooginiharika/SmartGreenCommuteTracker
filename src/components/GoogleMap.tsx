import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface GoogleMapProps {
  onRouteCalculated?: (distance: number, duration: number) => void;
  startLocation?: string;
  endLocation?: string;
  transportMode?: 'WALKING' | 'BICYCLING' | 'TRANSIT' | 'DRIVING';
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function GoogleMap({ onRouteCalculated, startLocation, endLocation, transportMode = 'WALKING' }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => setError('Failed to load Google Maps');
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          zoom: 13,
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const directionsServiceInstance = new window.google.maps.DirectionsService();
        const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
          draggable: true,
          panel: null,
        });

        directionsRendererInstance.setMap(mapInstance);

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
        setIsLoaded(true);

        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              mapInstance.setCenter(userLocation);
            },
            (error) => {
              console.warn('Geolocation error:', error);
            }
          );
        }
      } catch (err) {
        setError('Failed to initialize map');
        console.error('Map initialization error:', err);
      }
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (isLoaded && directionsService && directionsRenderer && startLocation && endLocation) {
      calculateRoute();
    }
  }, [isLoaded, startLocation, endLocation, transportMode]);

  const calculateRoute = () => {
    if (!directionsService || !startLocation || !endLocation) return;

    const travelMode = window.google.maps.TravelMode[transportMode];

    directionsService.route(
      {
        origin: startLocation,
        destination: endLocation,
        travelMode: travelMode,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (result: any, status: any) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
          
          const route = result.routes[0];
          const leg = route.legs[0];
          const distance = leg.distance.value / 1000; // Convert to kilometers
          const duration = leg.duration.value / 60; // Convert to minutes

          onRouteCalculated?.(distance, duration);
        } else {
          setError(`Directions request failed: ${status}`);
        }
      }
    );
  };

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center text-gray-600">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden relative">
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-600">
            <Navigation className="w-8 h-8 mx-auto mb-2 animate-spin" />
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoogleMap;