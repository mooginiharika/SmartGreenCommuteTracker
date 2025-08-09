import { Footprints, Bike, Bus, Users, Car, DivideIcon as LucideIcon } from 'lucide-react';
import { TransportType } from '../types';

export function getTransportIcon(type: TransportType): LucideIcon {
  switch (type) {
    case 'walking':
      return Footprints;
    case 'biking':
      return Bike;
    case 'public_transit':
      return Bus;
    case 'carpool':
      return Users;
    case 'electric_vehicle':
      return Car;
    default:
      return Footprints;
  }
}

export function getTransportColor(type: TransportType): string {
  switch (type) {
    case 'walking':
      return 'bg-gradient-to-br from-green-500 to-emerald-600';
    case 'biking':
      return 'bg-gradient-to-br from-blue-500 to-cyan-600';
    case 'public_transit':
      return 'bg-gradient-to-br from-purple-500 to-violet-600';
    case 'carpool':
      return 'bg-gradient-to-br from-orange-500 to-amber-600';
    case 'electric_vehicle':
      return 'bg-gradient-to-br from-indigo-500 to-blue-600';
    default:
      return 'bg-gradient-to-br from-gray-500 to-gray-600';
  }
}

export function getTransportLabel(type: TransportType): string {
  switch (type) {
    case 'walking':
      return 'Walking';
    case 'biking':
      return 'Biking';
    case 'public_transit':
      return 'Public Transit';
    case 'carpool':
      return 'Carpool';
    case 'electric_vehicle':
      return 'Electric Vehicle';
    default:
      return 'Unknown';
  }
}