import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from "../../../global/KeyEvents";
import { addLine, removeLine } from "./FrameLine";

'use strict';

let currentLineElement:HTMLElement
let inputTargetEvent:HTMLInputElement

export function eventKeyDownKeyUpLineFrame(element:HTMLElement){
    element.addEventListener('keydown',(event)=> {
        crudLineQuadro(event)
    })
      element.addEventListener('keyup',(event)=> {
        KeyEventClear();
    })
}
function crudLineQuadro(event:Event){

    const key = (event as KeyboardEvent).key;
    KeyEventAdd(key)

    let nextLine = null;
    let previousLine = null;

    inputTargetEvent = event.target as HTMLInputElement
    currentLineElement = (event.currentTarget as HTMLElement)

    if(KeyEventGetIndex(0) == "ArrowUp"){
        event.preventDefault();
        previousLine = (currentLineElement.previousSibling as HTMLTableRowElement)

        let split = inputTargetEvent.getAttribute("name")!.split(".")
        let type = split[0]
        let object = split[1]
        let propert = split[2]

        var atribute =`input[name^="${type}.${object}.${propert}."]`;
        let varttt = previousLine?.querySelector(atribute);
        (varttt as HTMLInputElement)?.focus()
    }

    if(KeyEventGetIndex(0) == "ArrowDown"){
        event.preventDefault();
        nextLine = (currentLineElement.nextSibling as HTMLTableRowElement)

        let split = inputTargetEvent.getAttribute("name")!.split(".")
        let type = split[0]
        let object = split[1]!
        let propert = split[2]!

        var atribute =`input[name^="${type}.${object}.${propert}."]`;
        let varttt = nextLine?.querySelector(atribute);
        (varttt as HTMLInputElement)?.focus()
    }

    if (KeyEventGetIndex(0) == "Enter"){
        event.preventDefault();
        currentLineElement.after(addLine(inputTargetEvent));
    }
    if (KeyEventGetIndex(0) == "Control"){
        event.preventDefault();
        removeLine(currentLineElement,inputTargetEvent);
    }
}