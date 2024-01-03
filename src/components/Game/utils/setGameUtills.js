const faceArr = ["save", "tackle", "throwin", "goal", "shoot"];

export function randomFace() {
  return faceArr[Math.floor(Math.random() * faceArr.length)];
}

export function initiliazeCardFace() {
  const faces = Array.from({ length: 14 }, () => randomFace());
  faces.push("fulltime");

  for (let i = faces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [faces[i], faces[j]] = [faces[j], faces[i]]; // Swap elements
  }

  return faces;
}
