
import namor from "namor";
import "./index.css";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export function newPerson(firstName = namor.generate({ words: 1, numbers: 0 }), lastName = namor.generate({ words: 1, numbers: 0 }), score = Math.floor(Math.random() * 100) )   {
 
  return {
    firstName: firstName,
    lastName: lastName,
    score: score,

  };
};

export function makeData(len = 5553) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

