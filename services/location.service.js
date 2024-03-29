import locations from '../consts/locations';

export function getListTooltips (location) {
  if (
    locations[`${location}`] &&
    locations[`${location}`].tooltips &&
    locations[`${location}`].tooltips.length &&
    locations[`${location}`].tooltips.length > 0
  ) {
    return locations[`${location}`].tooltips;
  }
  return [];
}

export function getListTransitions (location) {
  if (
    locations[`${location}`] &&
    locations[`${location}`].transitions &&
    locations[`${location}`].transitions.length &&
    locations[`${location}`].transitions.length > 0
  ) {
    return locations[`${location}`].transitions;
  }
  return [];
}
export function getListImages (location) {
  if (
    locations[`${location}`] &&
    locations[`${location}`].images &&
    locations[`${location}`].images.length &&
    locations[`${location}`].images.length > 0
  ) {
    return locations[`${location}`].images;
  }
  return [];
}