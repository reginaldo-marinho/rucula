import { frame } from "../../../entities/form/frame";
import { representationField } from "../../../entities/form/representationField";
import { deleteLine as objectDeleteLine } from "../../../object/ObjectManagment";
import { deleteLine as tableDependencyDeleteLine , setDependency } from "../../../table-dependency/TableDependency";
import { getWindow } from "../../../window/Window";
import { prepareLineHeaderTable, prepareTBody, prepareTR } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
import { eventKeyDownKeyUpLineFrame } from "./FrameLineEvent";

export function createFrameLine(frame:frame){
    const line =  createFrame(frame)
    const table = document.createElement('table');
    table.classList.add("table-form")
    const header = prepareLineHeaderTable(frame.fields!);
    table.appendChild(header)
    const tbody = prepareTBody();
    const row = prepareTR(frame.fields!,{type:frame.type, objectDto:frame.objectDto})
    tbody.appendChild(row)
    table.appendChild(tbody)
    line.appendChild(table)
    eventKeyDownKeyUpLineFrame(row)
    return line
}

export function addLine(inputTargetEvent:HTMLInputElement){
    let objectDto = inputTargetEvent.getAttribute("name")?.split(".")[1];
    let window = getWindow();
    let frame = window.frames.find(c=> c.objectDto == objectDto)!
    let row = prepareTR(frame.fields!,{type:frame.type, objectDto:frame.objectDto})
    setDependencyforInputSpecial(row)
    row.querySelector("input")?.focus()
    eventKeyDownKeyUpLineFrame(row)
    return row;
}

export function removeLine(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement){

    let nextSibling = currentLineElement.nextSibling
    let previousSibling = currentLineElement.previousSibling;
    let Tbody  = currentLineElement.parentNode

    const input = currentLineElement.querySelector("input") as HTMLInputElement;
    let objectDto = input.getAttribute("name")!.split(".")[1] 
    let line = input.getAttribute("name")!.split(".")[3] 
    currentLineElement.remove();
    remove();
    if(Tbody?.childNodes.length == 0){
        let newLine = addLine(inputTargetEvent);
        Tbody.appendChild(newLine)
        return;
    }
    if(previousSibling){
        (previousSibling as HTMLElement).querySelector("input")?.focus();
    }
    if(nextSibling){
        (nextSibling as HTMLElement).querySelector("input")?.focus();
    }
    function remove(){
        objectDeleteLine({objectDto:objectDto, line:line})
        tableDependencyDeleteLine({objectDto:objectDto, line:line})
    }
}
function setDependencyforInputSpecial(row:HTMLTableRowElement){
    row.querySelectorAll("select, input[type='checkbox']").forEach((element)=> {    
        var elem = element as HTMLInputElement|HTMLSelectElement
        let repField = representationField.prepareINPUTToField(elem)
        setDependency(repField)
    })
}