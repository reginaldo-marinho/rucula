import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { button } from './button';
import { campo } from './campo';
import { dynamicForm } from './dynamicForm';
import { quadro } from './quadro';
import { eventFieldService } from './eventField';
import {ObjectsDOMBaseService} from './objects-DOM-base.component.service'
import { throwError } from 'rxjs';
import { disableDebugTools } from '@angular/platform-browser';
@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {

   constructor(private eventFieldService?:eventFieldService, private ObjectsDOMBaseService?:ObjectsDOMBaseService){}
    private form!:HTMLElement;
    private dynamicForm!:dynamicForm;
    private quadroInFocu!:quadro; 
    
    setForm(dynamic:dynamicForm){

      this.dynamicForm = dynamic;
      this.form = this.ObjectsDOMBaseService!.DOMFormDynamic();
      this.form.appendChild(this.ObjectsDOMBaseService!.DOMNameWindow(this.dynamicForm.tela))
      this.prepareQuadro()
      this.createButtons()
      this.setEvents()
    }
    private prepareQuadro(){
      /*
        block: são quadros que não contem contagem de linhas 
        line: são quadros que contém contagem de linhas 
      */
      this.dynamicForm.quadro?.forEach(quadro => {
        this.quadroInFocu = quadro //  guarda o quadro em foco no
        if (quadro.type=='block'){
          this.createQuadroBlock(quadro);
        }
        if (quadro.type=='line'){
           this.createQuadroList(quadro);
        }
      })
    }
    private createQuadroBlock(quadro:quadro){
      const _quadro = this.ObjectsDOMBaseService!.DOMcreateDivBlockElement(quadro) // cria o elemento do bloco
      const _fields = this.createElementFormItem(quadro.campo!);  // cria um array de elementos de entrada
      
      _fields.forEach(field => {
        _quadro.appendChild(field)
      })
      this.form.appendChild(_quadro)
    }
    
    private createElementFormItem(fields:Array<campo>):Array<HTMLDivElement>{
      let _fields: Array<HTMLDivElement> = new Array<HTMLDivElement>();
      fields.forEach(field => {
        _fields.push(this.createField(field)) 
      })
      return _fields;
    }
    private createQuadroList(quadro:quadro){
      const line = this.createQuadroListElement(quadro)
      const table = document.createElement('table');
      table.classList.add("table-form")

      quadro.line?.forEach(line => {
        const header = this.prepareLineHeaderTable(line.campo!);
        table.appendChild(header)

        const detail = this.prepareLineDetailTable(line.campo!);
        table.appendChild(detail)
      })
      line.appendChild(table)

      this.form.appendChild(line)
    }
    private createQuadroListElement(quadro:quadro){
      const div = document.createElement('div');
      div.classList.add('quadro-list')
      div.setAttribute('data-objectDto',quadro.objectDto)
      div.setAttribute('data-chield',quadro.child!)
      const h3 = document.createElement('h3');
      h3.textContent = quadro.name
      div.appendChild(h3)
      return div
    }
    private prepareLineHeaderTable(fields:Array<campo>):HTMLTableRowElement{
      
      let tr = document.createElement('tr');
      fields.forEach(field =>{
        const th = document.createElement('th');
        th.textContent = field.description
        if (field.required == true){
          th.textContent = th.textContent
          th.append(this.ObjectsDOMBaseService!.DOMLabelIsRequerid().cloneNode(true))
        }
        if (field.type == "text"){
          th.style.textAlign = "left"
        }
        if (field.type == "number"){
          th.style.textAlign = "right"
        }
        tr.appendChild(th)
      })
      return tr;
    }
    private prepareLineDetailTable(fields:Array<campo>):HTMLTableRowElement{
      
      let tr = document.createElement('tr');
      tr.setAttribute('data-objecdto',this.quadroInFocu.objectDto)
      fields.forEach(field =>{
        const td = document.createElement('td');
        td.appendChild(this.createFieldTypeLine(field))
        tr.appendChild(td)
      })
      return tr;
    }

    private createFieldTypeLine(field:campo):HTMLInputElement | HTMLSelectElement{
      let _element:HTMLInputElement | HTMLSelectElement
      switch(field.type){
        case 'text':
          _element = this.createFieldInputTypeLine(field);
          break;
        case 'number':
            _element = this.createFieldInputTypeLine(field);
            break;
        case 'select':
          _element = this.createFieldSelect(field);
          _element.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}.0`);

          break;
      }
      return _element!;
    }
    private createField(field:campo):HTMLDivElement{
      let _element
      switch(field.type){
        case 'text':
        case 'number':
          _element = this.createFieldInput(field);
          break;
        case 'select':
          _element = this.createFieldSelect(field);
          _element.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}`);
          break;
      }
      const formgroup = this.createformGroup(field)
      formgroup.appendChild(_element as HTMLElement)
      return formgroup;
  }
  createformGroup(field:campo):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add('form-group-item');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)
    
    label.textContent = field.description
    if (field.required == true){
      label.textContent = label.textContent
      label.append(this.ObjectsDOMBaseService!.DOMLabelIsRequerid().cloneNode(true))
    }
    div.appendChild(label)
    return div;
  }
  private createFieldInput(field:campo){
    const input = document.createElement('input');
      input.type = field.type;
      this.eventFieldService?.SetEvent(input)

      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "20px"  
      }
      this.setAtributesData(input,field)
      input.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}`);
      return input
  }
  private createFieldInputTypeLine(field:campo){
    const input = document.createElement('input');
    this.eventFieldService?.SetEvent(input)
      input.type = field.type;

      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "50px"  
      }
      this.setAtributesData(input,field)
      input.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}.0`);
      return input
  }

  private createFieldSelect(field:campo):HTMLSelectElement{
      const select = document.createElement('select');
      this.eventFieldService?.SetEvent(select)
      this.setAtributesData(select,field)
        field.combo?.forEach(item => {
          const option = document.createElement('option')
          option.text = item
          select.appendChild(option)
        })
      return select
  }
  private setAtributesData(node:HTMLElement,field:campo){
    node.setAttribute('data-max',String(field.max));
    node.setAttribute('data-min',String(field.min));
    node.setAttribute('data-required',String(field.required));
    node.setAttribute('data-disable',String(field.disable));
    node.setAttribute('data-childdto',`${this.quadroInFocu.child}`);
    
  }
  private keyEvents:Array<string> = new Array<string>();
  private lineClone:Map<string,HTMLElement> = new  Map<string,HTMLElement>(); // como pode conter mais de uma tela de linha, é importante ser um arra map
  
  setEvents(){
    const line =  document.querySelectorAll('.quadro-list table tr[data-objecdto]')
    
    line.forEach((element) => {
      element.addEventListener('keydown',(event)=> {
        this.crudLineQuadro(event)
      })
        element.addEventListener('keyup',(event)=> {
            this.keyEvents = []
      })
      this.lineClone.set(element.getAttribute("data-objecdto")!,(element as HTMLElement).cloneNode(true) as HTMLElement)
      
    }); 
  }
  private crudLineQuadro(event:Event){
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    if(this.keyEvents.filter(c=> c==key).length == 0){
      this.keyEvents.push(key)
    }
    this.keyEvents.sort()
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "Control" && this.keyEvents[2] ==  "l"){
        var clone = this.createNewLine(current.getAttribute('data-objecdto')!)
        current.after(clone)
    }
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "Control" && this.keyEvents[2] ==  "d"){
      if (document.querySelectorAll('.quadro-list table tr').length == 2){
        (event.currentTarget as HTMLElement).after(this.createNewLine(current.getAttribute('data-objectdto')!));
        (event.currentTarget as HTMLElement).remove()
      }else{
        (event.currentTarget as HTMLElement).remove()
      }
      this.keyEvents = []
    }
  }
  private createNewLine(ObjectdtoLine:string):HTMLElement{

    var clone = (this.lineClone.get(ObjectdtoLine) as HTMLElement).cloneNode(true);

    (clone as HTMLElement).childNodes.forEach(item => {
         let atributes = (item.firstChild as HTMLElement).getAttribute('name')?.split(".")!;

          (item.firstChild as HTMLElement).setAttribute('name',
          `${atributes[0]}.${atributes[1]}.${atributes[2]}.${Number(atributes[3])+1}`)         
    })
    this.lineClone.set(ObjectdtoLine,(clone as HTMLElement).cloneNode(true) as HTMLElement)
    
  
    clone.addEventListener('keydown',(event)=> this.crudLineQuadro(event))
    clone.addEventListener('keyup',(event)=> {
      this.keyEvents = [] 
    })
    return clone as HTMLElement;
  }

  private createButtons(){
    if(this.dynamicForm.type.toLocaleUpperCase() == "CRUD"){
      this.prepareButtonsCRUD()
    }
  }

  private prepareButtonsCRUD(){
    const boxActions = document.getElementById("box-actions")
    boxActions?.appendChild(this.createButtonOrLink({action:"new",link:"",icon:"bi bi-plus-lg",text:"",type:"button",}))
    boxActions?.appendChild(this.createButtonOrLink({action:"save",link:"",icon:"bi bi-save",text:"",type:"button",color:"#81e8fa"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"alter",link:"",icon:"bi bi-wrench",text:"",type:"button",color:"#81e8fa"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"delete",link:"",icon:"bi bi bi-trash3",text:"",type:"button",color:"#81e8fa"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"cancel",link:"",icon:"bi bi-x-lg",text:"",type:"button"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"",link:"https://developer.mozilla.org/pt-BR/docs/Web/CSS/text-align",icon:"",text:"Doc",type:"link",color:""}))
  }

  private createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
    let  buttonOrLink:HTMLButtonElement|HTMLAnchorElement
    
    if(button.type != "button" && button.type != "link"){
      throw new Error("tipo do botão deve ser button ou link");
    }
    if(button.type == "button"){
      buttonOrLink = document.createElement('button')  
      buttonOrLink!.classList.add("btn-crud")
      buttonOrLink.textContent = button.text+""
    }
    if(button.type == "link"){
      buttonOrLink = document.createElement('a')
      buttonOrLink.textContent = button.text+""
      buttonOrLink.href = `${button.link}`
      buttonOrLink!.classList.add("btn-link")
      buttonOrLink!.setAttribute('target',"_blank")
    }
    buttonOrLink!.setAttribute("id",`${button.type}-${button.action}`);

    if (button.color){
      buttonOrLink!.style.backgroundColor = button.color
    }

    if (button.icon){
      let  icon = document.createElement('i')
      button.icon.split(" ").forEach(item => 
        icon.classList.add(item)
      )
      buttonOrLink!.appendChild(icon)
    }
    return buttonOrLink!
  } 
  
  Maps!:Map<string,Array<KeyValue<string,Object>>>
  MapsLine!:Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>> 
  MapsChields!:Array<KeyValue<string,string>>
  objHeader : any = {};

  GetDto(){
    this.Maps = new Map<string,Array<KeyValue<string,Object>>>();
    this.MapsLine = new Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>();
    this.MapsChields = new Array<KeyValue<string,string>>();

    let form = document.getElementById("form-dynamic")
    let formData = new FormData(form as HTMLFormElement)

    for (const KeyValue of Object(formData).entries()) {

      let splitName = KeyValue[0].split(".") 
      let valor = KeyValue[1]
      let typeQuadro = splitName[0] 
      
      if (typeQuadro == "block"){
        this.PrepObjectTypeBlock(splitName,valor)
      } 
      if (typeQuadro == "line"){
        this.PrepObjectTypeLine(splitName,valor)
      } 
    }

    this.mapToObjBlock(this.Maps)
    this.mapToObjArray(this.MapsLine)
    this.SetChields()  
    console.log(this.objHeader)
    
  }

  PrepObjectTypeBlock(splitName:string[], valor:any){

    let object:string = splitName[1]    
    let propert:string = splitName[2]   

    let objectMap = this.Maps.get(object)
    if (objectMap == undefined){ // se não existir o objeto mapeado
      this.Maps.set(object,new Array({key:propert,value:valor})) // um novo map para o objeto é criado
    }
    if (objectMap != undefined && propert == "chield"){
      valor.split(",").forEach((chield:string) => {
        this.Maps.get(object)?.push({key:chield,value:{}})
        this.MapsChields.push({key:object,value:chield})
      });
    }
    if (objectMap != undefined && propert != "chield"){

      this.Maps.get(object)?.push({key:propert,value:valor})
    }
  }

  PrepObjectTypeLine(splitName:string[], valor:any){

    let object:string = splitName[1]    
    let propert:string = splitName[2]   
    let row:number = Number(splitName[3])   

    let objectMapDto = this.MapsLine.get(object)
    let objectMapRow = this.MapsLine.get(object)?.find(c => c.get(row))
    
    if (objectMapDto == undefined && objectMapRow == undefined){
      this.MapsLine.set(object,new Array(new Map().set(row,new Array({key:propert,value:valor}))))
    }
    if (objectMapDto != undefined && objectMapRow == undefined){
      this.MapsLine.get(object)?.push(new Map().set(row,new Array({key:propert,value:valor})))
    }
    if (objectMapDto != undefined && objectMapRow != undefined && propert == "chield"){
        valor.split(",").forEach((chield:string) => {
          objectMapDto?.find(c => c.get(row)?.push({key:chield,value:{}}))
          this.MapsChields.push({key:object,value:chield})
      });
    }
    if (objectMapDto != undefined && objectMapRow != undefined && propert != "chield"){
      objectMapDto?.find(c => c.get(row)?.push({key:propert,value:valor}))
    }
  }
  mapToObjBlock(mapBlock:Map<string,Array<KeyValue<string,Object>>>) {

    let obj : any = {};

    mapBlock.forEach((objectValue, objectkey) => {
      objectValue.forEach(function(propert){
        obj[propert.key] = propert.value
      });
      this.objHeader[objectkey] = obj
      obj = {}
    });
    return this.objHeader;
  }

  mapToObjArray(mapArray:Map<string,Array<Map<number,Array<KeyValue<string,Object>>>>>) {

    let objLine :Object[] = [];
    let obj : any = {};

    mapArray.forEach((obejctValue, obejctkey) => {
      
      obejctValue.forEach(function(rows, indexRow){
        
        rows.forEach(function(row, value){
          
          row.forEach(function(propert, value){
            obj[propert.key] = propert.value
          });  
          objLine.push(obj)
          obj = {}
        });  
      });
      this.objHeader[obejctkey] = objLine
      objLine = []

    });
  }
  
  SetChields(){
    this.MapsChields.forEach(item => {
      if(item.value != ""){
        this.objHeader[item.key][item.value] = this.objHeader[item.value]
        delete this.objHeader[item.value]
      }
    })
  }

}
 