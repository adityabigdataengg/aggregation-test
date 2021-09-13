class Greetings {
    greet():void {
        console.log("Hello world!!!")
    }
}

var a = new Greetings();
a.greet();

let character = 'mario'
let age = 30

const circ = (diameter: number, radius: number): number => {
    return diameter * Math.PI * radius
}

console.log(circ(12, 23))

let ninjas: any[] = []

ninjas.push(12)
ninjas.push('asd')


export enum EventType {
    LIKE = "like",
    UNLIKE = "unlike",
    COMMENT = "comment",
  }

  console.log(EventType)
  console.log(Array.from(Object.values(EventType) as string[]))
  console.log('like' in Object.values(EventType))
  console.log(EventType['LIKE'])

  console.log((Object.values(EventType) as string[]).includes('jgj'))