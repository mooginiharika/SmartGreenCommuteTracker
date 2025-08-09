import { TransportType } from '../types';

// CO2 emissions in kg per km for different transport modes
// Based on average car emissions of 0.2 kg CO2 per km
const BASELINE_CAR_EMISSIONS = 0.2; // kg CO2 per km

const TRANSPORT_EMISSIONS: Record<TransportType, number> = {
  walking: 0, // Zero emissions
  biking: 0, // Zero emissions
  public_transit: 0.05, // Much lower emissions per person
  carpool: 0.1, // Shared emissions (assuming 2+ people)
  electric_vehicle: 0.02, // Very low emissions (depending on grid)
};

export function calculateCO2Savings(transportType: TransportType, distance: number): number {
  const transportEmissions = TRANSPORT_EMISSIONS[transportType];
  const savedEmissions = (BASELINE_CAR_EMISSIONS - transportEmissions) * distance;
  return Math.max(0, savedEmissions); // Never negative
}

export function getTransportEmissions(transportType: TransportType, distance: number): number {
  return TRANSPORT_EMISSIONS[transportType] * distance;
}

export function getEquivalentTrees(co2Saved: number): number {
  // One tree absorbs approximately 22 kg of CO2 per year
  return co2Saved / 22;
}

export function getEquivalentMiles(co2Saved: number): number {
  // Equivalent miles not driven in a car
  return co2Saved / BASELINE_CAR_EMISSIONS;
}