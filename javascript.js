const numbers=[];

  const suits=['diamonds', 'clubs', 'hearts', 'spades']

  for(let index=0; index<4; index++){

    for(let i=1; i<14; i++){
      numbers.push({maa:suits[index], arvo:i});
    }
  }
  
  function shareCards(){
    for (let i = numbers.length - 1; i > 0; i--) {
        const indexToChange = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[indexToChange]] = [numbers[indexToChange], numbers[i]];
    }
    const elements=document.getElementsByClassName('cards');

    let indexForAll=0;
    for(let index=0; index<5; index++){
        for(let i=0; i<3; i++){
                let text=document.createTextNode(numbers[indexForAll].maa+" "+numbers[indexForAll].arvo);
                let li=document.createElement("li");
                let child=li.appendChild(text);
                li.className="list-group-item";
                elements[i].appendChild(li);
                indexForAll++;
            }
        }
    for(let i=0; i<elements.length; i++){

        let values=elements[i].children.text;
        let array=[];
        for(let ind=0; ind<values.length; ind++){
            let splitted=values[ind].split(" ")
            array.push({splitted})
        }

    }


  }















