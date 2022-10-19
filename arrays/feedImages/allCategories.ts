import { C_L } from "./C_L"
import { code } from "./code"
import { SO } from "./SO"
import { mobile } from "./mobile"
import { tech } from "./tech"

const categories = [
    tech[Math.floor(Math.random() * tech.length)],
    mobile[Math.floor(Math.random() * mobile.length)],
    C_L[Math.floor(Math.random() * C_L.length)],
    SO[Math.floor(Math.random() * SO.length)],
    code[Math.floor(Math.random() * code.length)]
]

function randomValue(array:Array<{ image: string; name: string; }>) {
    let temporaryValue 
    let j = Math.floor(Math.random() * (array.length))
    for (let i = array.length-1; i > 0; i--) {
        temporaryValue = array[i]
        array[i]=array[j]
        array[j]= temporaryValue
    }
}
randomValue(categories)
export const randomCategories = categories