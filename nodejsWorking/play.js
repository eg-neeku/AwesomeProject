/*
const person = {
    name: "Peter",
    age: 40,
    // invoking this will display undefined due to global scope of the ES6 function.
    greetES6: () => {
        console.log(`This way will display undefined: Name is ${this.name} and age is ${this.age}`);
    },
    // old standard approach
    greet: function(){
        console.log(`Old Approach: Name is ${this.name} and age is ${this.age}`);
    },
    // invoking this will display the value by preserving global scope of the ES6 function.
    greetUsingES6(){
        console.log(`ES6 approach: Name is ${this.name} and age is ${this.age}`);
    }
}

console.log(person);
person.greetES6();
person.greet();
person.greetUsingES6();
*/

/*
let hobbies = ["Chess", "Carrom"]

const displayElementAtIndex = () => {
    for (let hobby in hobbies) {
        console.log(`Hobby ${hobbies[hobby]} is located at index ${hobby}`);
    }
}

const displayElementAsItIs = () => {
    console.log("Hobbies are: ");
    for (let hobby of hobbies) {
        console.log(hobby);
    }
}

const displayElementInAStraightLine = () => {
    console.log(`Elements displaying using spread operator: ${[...hobbies]}`);
}

const displayElementByMap = () => {
    console.log(`Elements displaying using map function: `);
    hobbies.map(hobby => {
        console.log(hobby);
    })
    const res = hobbies.map(hobby => {
        return hobby;
    })
    console.log(res);
}

displayElementAtIndex();
displayElementAsItIs();
displayElementInAStraightLine();
displayElementByMap();

const addHoby = (hobby) => {
    return [...hobbies, hobby];
}

hobbies = addHoby("Ski Diving");
hobbies = addHoby("Hill Climbing");

let res = hobbies.filter(item => item !== item.startsWith("C"))
res = hobbies.filter(item => !item.startsWith("C"))
console.log(hobbies, res);


hobbies.push(1010)
console.log(hobbies);

const [firstHib, secondHob, ...hobs] = hobbies; // same for the person object
console.log(firstHib,secondHob,hobs);

const person = {
    name:"Max",
    age:3
}

const see = ({name})=>console.log(name);

see(person);
*/

const fetchData = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            callback('Done');
        }, 1500) // 2seconds
    });
    return promise;
}

setTimeout(() => {
    console.log('Timer is done');
    fetchData().then((text) => {
        console.log(text);
        return fetchData();
    }).then(text2 => {
        console.log(text2);
    });
}, 2000) // 2seconds

console.log("Hello!");
console.log("Hi!");

[].concat(item) // this is the nice functions in ReactJS handling stuffs.

const[w,setCourseGoals] = useState([])

setCourseGoals(prev=>prev.concat(newGoal))  