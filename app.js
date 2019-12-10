//muuttujat..

const numbers=[];

const suits=['Timantti', 'Risti', 'Hertta', 'Pata'];

const hands=[[],[],[]];
let arvot=[];
let maat=[];
const points=[];
const fileParts=[];


//luodaan korttipakan kortit

for(let index=0; index<4; index++){

    for(let i=1; i<14; i++){

      numbers.push({maa:suits[index], arvo:i});
    }
}

//funktiot
  
function shareCards(){

    //sekoitetaan kortit ja jaetaan kolmelle

    for (let i = numbers.length - 1; i > 0; i--) {
        const indexToChange = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[indexToChange]] = [numbers[indexToChange], numbers[i]];
    }

    let indexForAll=0;
    for(let index=0; index<5; index++){
        for(let i=0; i<3; i++){
                let maa=numbers[indexForAll].maa;
                let arvo=numbers[indexForAll].arvo;
                hands[i].push({maa,arvo});
                indexForAll++;
        }
    }

  }

//järjestetään kortit sen mukaan, että suurin arvo on ensin

function sort(hand){
 
    function compare(a, b) {
        if (a.arvo > b.arvo)
            return -1;
        if (a.arvo < b.arvo)
            return 1;
        return 0;   
    }

    return hand.sort(compare);
}

//tarkistetaan pokerikädet ja palautetaan vastaus

function check(sortedHand){

    let result = "";

    for(var i = 0; i < 5; i ++){
        arvot.push(sortedHand[i].arvo);
        maat.push(sortedHand[i].maa);     
   }

    switch(checkDuplicate()){
         case "2":
              result = "Pari";
              break;
          case "22":
              result = "Kaksi paria";
              break;
         case "3":
              result = "Kolme samaa";
              break;
         case "23":
         case "32":
              result = "Täyskäsi";
              break;
         case "4":
              result = "Neljä samaa";
              break;
         case "5":
              result = "Viisi samaa";
              break;
         default:
              if(isStraight(sortedHand)){
                   result = "Suora";     
              }
              if(isAceStraight()){
                   result = "Ässäsuora";
              }
              break;
    }
    if(isFlush()){
         if(result){
              result += " ja Väri";     
         }
         else{
              result = "Väri";
         }
    }
    if(result==""){
         result = "Suurin kortti on "+sortedHand[0].maa+" "+sortedHand[0].arvo;
    }
    arvot=[];
    maat=[];
    return  result;
}  

//tarkistetaan onko väri

function isFlush(){
    for(var i = 0; i < 4; i ++){
         if(maat[i] != maat[i+1]){
              return false;
         }
    }
    return true;
}

//tarkistetaan onko suora

function isStraight(hand){
    const lowest = hand[4];
    for(let i = 1; i < 5; i++){
         if(subtraction(lowest + i) != 1){
              return false
         }     
    }
    return true;
}

//jos ässäsuora
function isAceStraight(){
    if(arvot==[1, 9, 10, 11, 12]){
        return subtraction(1) == 0;
    }
}

function checkDuplicate(){
    const pairsFound = []; 
    let result = "";
    for(let i = 0; i < arvot.length; i++){
         let occurrences = subtraction(arvot[i]);
         if(occurrences > 1 && pairsFound.indexOf(arvot[i]) == -1){
              result += occurrences; 
              pairsFound.push(arvot[i]);    
         }
    }
    return result;
}

function subtraction(n){
    let count = 0;
    let index = 0;   
    do{          
         index = arvot.indexOf(n, index) + 1;  
         if(index == 0){
              break;
         }
         else{
              count ++;
         }
    } while(index < arvot.length);
    return count;
}  


//Suorittaminen alkaa..

  shareCards();


  for(let i=0; i<hands.length;i++){

    let hand=hands[i];
    let text=JSON.stringify(hand)
    let sortedHand=sort(hand);
    let result=check(sortedHand)
    let player="Pelaaja"+(i+1)+": ";
    fileParts.push({player, sortedHand, result});
  }

  console.dir(fileParts, {depth: null, colors: true})

//analysis.txt-tiedostoon kirjoittaminen

const fs = require('fs');
fs.writeFile('analysis.txt', JSON.stringify(fileParts, null, 2), function (err) {
     if (err) throw err;
     console.log('Tallennettu tiedostoon analysis.txt');
   });

fs.writeFile('analysis.json', JSON.stringify(fileParts, null, 2), function (err) {
     if (err) throw err;
   console.log('Tallennettu tiedostoon analysis.json');
     });
   

















