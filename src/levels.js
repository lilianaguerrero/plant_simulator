import Water from "/src/water";
import Nutrient from "/src/nutrient";
import Sun from "/src/sun";

export function buildLevel(game, level) {
  let resources = [];

  level1.forEach((row, rowIndex) => {
    row.forEach((resource, resourceIndex) => {
      let position = {
        x: 80 * resourceIndex,
        y: 30 + rowIndex
      };
      if (resource === 0) {
        resources.push(new Nutrient(game, position));
      } else if (resource === 1) {
        resources.push(new Water(game, position));
      } else if (resource === 2) {
        resources.push(new Sun(game, position));
      }
    });
  });

  return resources;
}

export const level1 = [[0, 1, 2, 1, 2, 0, 0, 1, 2, 1]];
