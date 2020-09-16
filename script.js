// Write your JavaScript code here!

let regex = RegExp(/^[a-zA-Z ]+$/);

function validation(formArray, alrt){
   if(!formArray.includes('')){
      return true; 
   } else if(alrt === true){
      alert('all fields are required');
   } else {
      return false;
   }
}

function isNum(fieldLabel, item){
   if(isNaN(item)){
      alert(`Please enter only number in the ${fieldLabel} field`);
   } else {
      return true;
   }
}

function isString(title, name, alrt){
   if(regex.test(name)){
      return true;
   } else if (alrt === true) {
      alert(`Please enter only letters in the ${title} Name Field`);
  } else {
     return false;
  }
}

function friendsofp(title, name, status, alrt){
   if(!name || !isString(title, name, alrt)){
      status.innerHTML = `${title} is not ready for launch`;
   } else {
      status.innerHTML = `${title} ${name} is ready for launch`;
      return true;
   }
}

function notready(){
   launchStatus.innerHTML = "Shuttle not ready to launch";
   launchStatus.style.color = "red";
   faultyItems.style.visibility = "visible";
}

function check(fuelLevel, cargoMass, alrt){
   let checkArr = [fuelLevel, cargoMass];
   let fuel = null;
   let cargo = null;

   if(validation(checkArr, alrt)){
      if(fuelLevel >= 0 && fuelLevel < 10000){
         notready();
         fuelStatus.innerHTML = `Fuel level is too low to launch`; 
         fuel = false; 
      } else if(fuelLevel > 10000){
         fuelStatus.innerHTML = "Fuel level is high enough for launch";
         fuel = true;
      }
      
      if(cargoMass && cargoMass > 10000){
         notready();
         cargoStatus.innerHTML = "There is too much mass for the shuttle to take off.";
         cargo = false;
      } else if(cargoMass >= 0 && cargoMass < 10000 && fuelLevel) {
         cargoStatus.innerHTML = "Cargo mass low enough for launch";   
         cargo = true;
      }
      if(cargo && fuel){
         return true;
      }
   } else {
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
   }
}

function init () {

    let faultyItems = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let form = document.querySelector('form');

    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
          let num = Math.floor(Math.random() * json.length);
          const div = document.getElementById("missionTarget");
              div.innerHTML += `
               <h2>Mission Destination</h2>
                  <ol>
                      <li>Name: ${json[num].name}</li>
                     <li>Diameter: ${json[num].diameter}</li>
                     <li>Star: ${json[num].star}</li>
                     <li>Distance from Earth: ${json[num].distance}</li>
                     <li>Number of Moons: ${json[num].moons}</li>
                  </ol>
              <img src="${json[num].image}">
            `;
      })
  });

   form.addEventListener("submit", function(event){
      event.preventDefault();
      pilotName = document.querySelector("input[name=pilotName]").value;
      copilotName = document.querySelector("input[name=copilotName]").value;
      fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      cargoMass = document.querySelector("input[name=cargoMass]").value;
      formArray = [pilotName, copilotName, fuelLevel, cargoMass];

      if(validation(formArray, true) && isString('Pilot', pilotName, true) && 
         isString('Co-Pilot', copilotName, true) && isNum('Fuel Level', fuelLevel) && 
         isNum('Cargo Mass', cargoMass) && (cargoMass.value < 10000) && (fuelLevel > 10000) ){

      } else {
      
      let pilot = friendsofp('Pilot', pilotName, pilotStatus, false);
      let copilot = friendsofp('Co-Pilot', copilotName, copilotStatus, false);
      let mic = check(fuelLevel, cargoMass, false);
      
      if(mic && pilot && copilot){
         launchStatus.innerHTML = "Shuttle is ready for launch";
         faultyItems.style.visibility = "visible";
         launchStatus.style.color = "green";
      } else if(!pilot || !copilot) {
         launchStatus.innerHTML = "Awaiting Information Before Launch";
         launchStatus.style.color = "black";
         faultyItems.style.visibility = "hidden";
      }
   }
 });
}

window.onload = init;