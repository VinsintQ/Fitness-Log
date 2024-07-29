//Selecting input fields
const timeField = document.querySelector("#time");
const typeField = document.querySelector("#type");
const caloriesField = document.querySelector("#calories");
const distanceField = document.querySelector("#distance");
const distanceLabel = document.querySelector(".distancelabel");
const cloriesfieldToSubmit = document.querySelector(".send");
//variables
let time = timeField.value / 60;
let type = typeField.value;
let distance = distanceField.value;
let speed = distance / time;
calculateCalories();
//adding Even Listenrs

//read time
timeField.addEventListener("change", () => {
  //convert time to hour
  time = timeField.value / 60;

  calculateCalories();
});
// read Type
typeField.addEventListener("change", () => {
  type = typeField.value;

  calculateCalories();
});
//read Speed
distanceField.addEventListener("change", () => {
  distance = distanceField.value;
  if (time) {
    speed = distance / time;

    calculateCalories();
  }
});

//functions
function calculateCalories() {
  if (time && distance && type) {
    // distanceField.classList.remove("hide");
    // distanceLabel.classList.remove("hide");
    //for Running
    if (type === "Running") {
      const met = runMet(speed);

      calories = met * 80 * time;
      caloriesField.value = calories;
      cloriesfieldToSubmit.value = calories;
    }
    //for Swimming
    if (type == "Swimming") {
      const met = swimMet(speed);

      const calories = met * 80 * time;
      caloriesField.value = calories;
      cloriesfieldToSubmit.value = calories;
    }
    //for Cyclying
    if (type == "Cycling") {
      const met = cyclyingMet(speed);

      const calories = met * 80 * time;
      caloriesField.value = calories;
      cloriesfieldToSubmit.value = calories;
    }
  }
  if (type == "Walking") {
    distanceField.classList.add("hide");
    distanceLabel.classList.add("hide");
  } else {
    // distanceField.classList.remove("hide");
    // distanceLabel.classList.remove("hide");
  }
  if ((type == "Walking") & (time > 0)) {
    const met = 4;

    const calories = met * 80 * time;
    caloriesField.value = calories;
  }
}
// calculate met for running
function runMet(speedKmh) {
  const a = 0.9;
  const b = 1.5;

  return a * speedKmh + b;
}
function swimMet(speedkmh) {
  const c = 0.02;
  const a = 1.0;
  const b = 3.0;

  return c * Math.pow(speed, 2) + a * speed + b;
}
function cyclyingMet(speedkmh) {
  const c = 0.01;
  const a = 0.7;
  const b = 3.5;

  return c * Math.pow(speed, 2) + a * speed + b;
}
