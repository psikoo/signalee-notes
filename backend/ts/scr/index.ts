console.log("Your TS project is working :3");

// :number and :string
let num:number = 5;
let str:string = "womp";
// array, list, tuple
let arr:number[] = [0,1];
let list:Array<number> = [0,1,2,3,4,5];
let tuple:[string, number] = ["str", 0];
// :Date
const date:Date = new Date(2005, 10, 2);

printInfo(num, 1, 2, 3);
function printInfo(number:number, ...scores:Array<number>):void {
    // :number and :string
    console.log(num + " is a " + typeof num);
    console.log(str + " is a " + typeof str);
    // array, list, tuple
    console.log(arr + " is a " + typeof arr);
    console.log(list + " is a " + typeof list);
    console.log(tuple + " is a " + typeof tuple);
    // :Date
    console.log(date + " is a " + typeof date);
    date.setDate(date.getDate()+number);
    console.log(date + " is a " + typeof date);
    // Undefined arguments length
    console.log(scores);
}

// :never
doSomeAction("Pending");
type Status = "Pending" | "Working" | "Complete" | "Cancelled";
function doSomeAction(status:Status) {
    switch (status) {
        case "Pending":
            console.log("Pending");
            break;
        case "Working":
            console.log("Working");
            break;
        case "Complete":
            console.log("Complete");
            break;
        case "Cancelled":
            console.log("Cancelled");
            break;
        default: 
            // If this is ever reachable there will be a type error as no variable should be type :never
            neverReached(status)
    }
}
function neverReached(_never:never) {}

// :unknown 
console.log(add("5",10));
function add(a:unknown, b:unknown):number|string {
    return (typeof a === "number" && typeof b === "number") ? a+b : "those are not numbers";
}

// enums
enum lvl {
    low,
    mid,
    high
}
let level:lvl = lvl.low;
console.log(level);

// objects
const myObject:{string1:string; number1:number;} = {
    string1:"aaaa",
    number1: 10
};

// type aliases
type Name = string;
let firstName:Name = "Tom";

type Log = (
    message: string, 
    ret?: number|string
) => number|string;
const log:Log = (message:string, ret?:number|string):number|string => {
    return (typeof ret == 'undefined') ? message : ret; 
};
console.log(log("msg", 10));

type Score = {
    name:string; 
    score:number;
    pass?: boolean;
    log: Log; // forces any Score object to implement Log
}; // more readable objects
const person1:Score = {name:"Tom", score:70, log};
const person2:Score = {name:"Ben", score:50, log, pass:true};
console.log(person1.log("Tom log()"));
console.log(person2)

// interfaces
interface Inter {
    string1:string;
    number2?:number;
    add10:(x:number, option?:string) => number;
    sub10?:(x:number) => number;
}
function addition(number3:number):number { return number3+10; }
function subtraction(number3:number):number { return number3-10; }
let test:Inter = {
    string1:"aaaa",
    number2:2,
    add10:addition,
    sub10:subtraction,
};

interface interPlus extends Inter {
    color:string;
}
let test2:interPlus = {
    string1:"aaaa",
    add10:addition,
    color:"ffffff",
};

interface LogInter {
    (message: string, int?:number): void;
}
const logger: LogInter = (message: string):void => {
    console.log(message);
}

// unions
type A = null; type B = null; type C = null;
type A_or_B_or_C = A | B | C;

type Age = number | null | undefined;
let age:Age = undefined;

type Fruit = "Banana" | "Apple" | "Pear";
let fruit = "Pear";

type Actions = {type:"loading"} | {type:"loaded"; data: { name: string }};
const loadingAction:Actions = {type:"loading"};

// unions
type D = null; type E = null; type F = null;
type A_and_B_and_C = D & E & F;

type Name1 = { name1:string; };
type Phone = { mobile:number; };
type Email = { email:string; };
type Contact = Name1 & Phone & Email;
const cont:Contact = {
    name1: "Fred",
    mobile: 4355435,
    email: "@gmail.com",
};

// classes 
class Car {
    private name:string;
    private model?:string;
    readonly prize?:number;
    setName(newName:string) { this.name = newName; } 
    setModel(newModel:string) { this.model = newModel; }
    getName() { return this.name; } 
    getModel() { return this.model; }
    constructor(name:string, model?:string, prize?:number) {
        this.name = name;
        this.model = model;
        this.prize = prize;
    }
    copy(name:string):Car {
        return new Car(name, this.model, this.prize);
    }
    static equal(car1:Car, car2:Car):boolean {
        return car1.name === car2.name && car1.model === car2.model && car1.prize === car2.prize;
    }
}
const car1 = new Car("Ferrari");
console.log(car1)
const car2 = car1.copy("Toyota");
console.log(car2)
console.log(Car.equal(car1, car2))

class SuperCar extends Car {
    private SuperCar?:boolean;
    setSuperCar(newSuperCar:boolean) { this.SuperCar = newSuperCar; }
    getSuperCar() { return this.SuperCar; }
    constructor(superCar:boolean, name:string, model:string, prize:number) {
        super(name, model, prize);
        this.SuperCar = superCar;
    }
}
const superCar = new SuperCar(true, "Ferrari", "womp", 10);
console.log(superCar)

// abstract classes
// https://learntypescript.dev/05/l4-extending