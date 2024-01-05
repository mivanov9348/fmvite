import faceArr from "./gameConstants.js";

export function randomFace() {
  return faceArr[Math.floor(Math.random() * faceArr.length)];
}

export function initiliazeCardFace() {
  let faces = Array.from({ length: 14 }, () => randomFace());
  faces.push("fulltime");

  for (let i = faces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [faces[i], faces[j]] = [faces[j], faces[i]]; // Swap elements
  }

  return faces.map((face) => ({ face, opened: false }));
}

export function findNextFixture(fixtures, selectedTeam) {
  return fixtures.find(
    (fixture) =>
      (fixture.HomeTeam === selectedTeam.name ||
        fixture.AwayTeam === selectedTeam.name) &&
      !fixture.isPlayed
  );
}
