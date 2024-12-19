import { cookie } from "../../common/coockie";
import { constIdBaseWindow, constPagination } from "../../const";

export class WindowBaseDOM {

    private P:string
    private ruculaWindow = document.createElement("div");
    private globalWindow:HTMLElement

    constructor(prefix:string, config: {
        globalWindow:HTMLElement,
        openLeftGrid:boolean,
        windowName:string
    }){
        this.P = prefix
        this.globalWindow = config.globalWindow
        this.createWindowBase(config.globalWindow)
        this.createNameWindow(config.windowName)
        this.closeLeftGrid(config.openLeftGrid)
    }

    private createWindowBase(globalWindow:HTMLElement){


        this.ruculaWindow.classList.add("r-w");
        this.ruculaWindow.classList.add(`${this.P}r-w`);

        const actions = this.componentActions();
        this.ruculaWindow.appendChild(actions)
        
        const contentForm = this.createComponentCreateOrEdit() as HTMLDivElement
                
        this.ruculaWindow.appendChild(contentForm.childNodes[0] as HTMLDivElement)
        this.ruculaWindow.appendChild(contentForm.childNodes[1] as HTMLDivElement)

        globalWindow?.appendChild(this.ruculaWindow);

        this.prepareEventsButtonsCrud()
        this.maximizeWindow()
        this.eraseWindow()
        this.alterTheme()
        this.openActionswindow()
        this.actionCrudpreventDefault()

        let offsetTop = Number(this.ruculaWindow.offsetTop)
        let height = Number(window.innerHeight)
        this.ruculaWindow.style.height = `${height-offsetTop}px` // heigth

    }

    private createNameWindow(name:string){
        let window = this.ruculaWindow.querySelector(".r-w-t") as HTMLElement
        window.innerHTML = name
    }

    private openCloseContainer(){

        let itemContainer = document.querySelectorAll(`.${this.P}js-open-close-container`)

        itemContainer.forEach(item => {
            item.classList.toggle("r-display-none")
        })
    }
    
    private componentActions(){
        const actions = document.createElement("div");
        actions.className = "r-left-block"

        const ACTIONS =
            `<div class="r-act" id="${this.P}actions">
                <div class="r-act-opt r-head" id="${this.P}w-title">
                    <button id="${this.P}${constIdBaseWindow.NEW}" class="r-a-b r-btn-new-cancel-close"><i class="bi bi-plus-lg"></i></button>
                    <div class="r-w-t">
                    </div>
                    <button id="${this.P}r-a-many" class="r-a-b"><i class="bi bi-list"></i></button>
                </div>
                <div class="r-left-block-grid" id="${this.P}w-grid">
                    <form class="searh-items-grid" id="${this.P}${constPagination.FIND}" autocomplete=off>
                        <input name="r-find-value" type="text"/>
                        <button><i class="bi bi-search"></i></button>
                    </form>
                    <div class="r-act-grid-body">
                    </div>
                    <div class="r-act-grid-footer" id="${this.P}r-act-grid-footer">
                        <div>
                            <span>N. Linha</span>
                            <select id="${this.P}${constPagination.ROW_NUMBER}" name="len-page">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="1000">1000</option>
                            </select>
                        </div>
                         <div>
                            <button id="${this.P}${constPagination.FIRST}" class="r-a-b"><i class="bi bi-arrow-up"></i></button>
                            <button id="${this.P}${constPagination.LAST}" class="r-a-b"><i class="bi bi-arrow-down"></i></button>
                            <button id="${this.P}${constPagination.PREVIOUS}" class="r-a-b"><i class="bi bi-arrow-left"></i></button>
                            <button id="${this.P}${constPagination.NEXT}" class="r-a-b"><i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
             </div>`

        actions.innerHTML = ACTIONS;

        return actions.cloneNode(true);
    }

    private createComponentCreateOrEdit(){

        const contentForm = document.createElement("div");

        const CREATE_OR_EDIT =
        `<div class="container-r-f  ${this.P}js-open-close-container">
            <div class="r-act-opt r-head" id="${this.P}w-title">
            </div>
            <div class="r-f-items r-f-home">
                <div class="r-f-home-round">
                    <i id="${this.P}r-f-home-icon"class="bi" ></i>
                </div>
                <h3 id="${this.P}r-f-home-title"></h3>
            </div>
        </div>
        <div autocomplete="off" class="${this.P}r-f container-r-f r-display-none ${this.P}js-open-close-container">

        <div class="r-facede-action top">
            <div class="r-window-name r-facede-action top">
                <h3 class="${constIdBaseWindow.TITLE}"></h3>
            </div>
            <div class="r-head r-read-new r-facede-action top">

                <div style="z-index: 10;">
                    <button id="${this.P}${constIdBaseWindow.ACTIONS_WINDOW}" class="r-a-b r-actions-window"><i class="bi bi-nut"></i></button>
                    <div class="r-display-inline-block r-actions-window r-actions-window-itens">
                        <div class="r-display-inline-block">
                            <button id="${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}" class="r-a-b"><i class="bi bi-arrows"></i></button>
                            <button id="${this.P}${constIdBaseWindow.ALTER_THEME}" class="r-a-b "><i class="bi bi-circle-half"></i></button>
                        </div>
                        <div class="actions-view">
                            <button id="${this.P}${constIdBaseWindow.GLOBALIZATION}" class="r-a-b">
                                <i class="bi bi-globe-americas"></i>
                                <ol id="${this.P}${constIdBaseWindow.OLLI_GLOBALIZATION}" class="${constIdBaseWindow.OLLI_GLOBALIZATION} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>
                            </button>
                            <button id="${this.P}${constIdBaseWindow.ENVIROMENT}" class="r-a-b">
                                <div class="desc-environment"><i class="bi bi-fire"></i> <span class="description"></span> </div>
                                <ol id="${this.P}${constIdBaseWindow.OLLI_ENVIROMENT}" class="${constIdBaseWindow.OLLI_ENVIROMENT} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>
                            </button>
                        </div>
                    </div>
                </div>
                 <div class="r-display-inline-block">
                        <button id="${this.P}${constIdBaseWindow.FAVORITE}" class="r-a-b"><i class="bi bi-star-fill"></i></button>
                        <button id="${this.P}${constIdBaseWindow.CHAT}" class="r-a-b"><i class="bi bi-chat-dots"></i></button>
                        <button id="${this.P}${constIdBaseWindow.USER}" class="r-a-b"><i class="bi bi-person-circle"></i></button>
                    </div>
                </div>
            </div>

            <div class="r-w-body">
                <form class="r-window-work" autocomplete="off">
                    <div class="r-head r-read-edit r-facede-action-crud" id="${this.P}r-facede-action-crud">
                        <h3 id="${this.P}${constIdBaseWindow.FRAME_INFO}">
                        </h3>
                        <div id="${this.P}action-crud">
                            <button id="${this.P}r-a-save" class="r-a-b r-a-b-disable managed"><i class="bi bi-box-arrow-in-down"></i></button>
                            <button id="${this.P}r-a-alter" class="r-a-b r-a-b-disable managed"><i class="bi bi-pen"></i></button>
                            <button id="${this.P}r-a-delete" class="r-a-b r-a-b-disable managed"><i class="bi bi-trash"></i></button>
                            <button id="${this.P}r-a-reload" class="r-a-b r-a-b-disable"><i class="bi bi-arrow-repeat"></i></button>
                            <button id="${this.P}erase-window" class="r-a-b"><i class="bi bi-eraser"></i></button>
                            <button id="${this.P}r-a-menu-vertical" class="r-a-b"><i class="bi bi-arrows"></i></button>
                        </div>
                    </div>
                    <div class="r-f-work r-f-items" id="${this.P}${constIdBaseWindow.FORM_RUCULA_JS}">
                    </div>
                </form>
                <div class="r-vertical-actions ${this.P}r-vertical-actions">
                    <ol id=${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST} class="">
                    </ol>
                    <button id=${this.P}${constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE} class="r-a-b actions-mobile"><i class="bi bi-arrows"></i></button>
                </div>
            </div>
            <div class="r-facede-action bottom">
            </div>
            <div class="r-box-show" id="${this.P}r-box-show">
            </div>
        </div>
        `

        contentForm.innerHTML = CREATE_OR_EDIT;
        return contentForm.cloneNode(true);
    }

    private prepareEventsButtonsCrud(){

        let rNew = this.ruculaWindow.querySelector(`#${this.P}${constIdBaseWindow.NEW}`)

        let framesOn = cookie.read("frames-on");
        if(framesOn != "false"){
            openClose()
        }

        rNew!.addEventListener("click", () => {

            let value = cookie.read("frames-on") == "true"
            document.cookie=`frames-on=${!value}`
            this.openCloseContainer();
            openClose()

        })

        function openClose(){
            rNew!.classList.toggle("r-btn-new-convert-close")
            rNew!.classList.toggle("r-btn-new-cancel-close")
        }
    }


    private closeLeftGrid(grid:boolean){

        if(grid == false){

            let rf = this.globalWindow.querySelector(`.${this.P}r-f.r-display-none`)

            if(rf != null){
                let buttonNew = this.globalWindow.querySelector(`#${this.P}${constIdBaseWindow.NEW}`);
                (buttonNew as HTMLElement).click()
            }

            let actions = this.globalWindow.querySelector(`#${this.P}actions`);
            actions?.remove()

            let maximizeWindow = this.globalWindow.querySelector(`#${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}`)
            maximizeWindow?.remove()

        }
    }

    private maximizeWindow(){

        let maximize = document.getElementById(`${this.P}${constIdBaseWindow.MAXIMIZE_WINDOW}`);


        maximize?.addEventListener('click',() => {
            let actions = document.getElementById("actions");
            actions?.classList.toggle("r-close-grid");
        })
    }

    private eraseWindow(){

        const eraseWindow = `${this.P}${constIdBaseWindow.ERASE_WINDOW}`
        
        let evt = new Event(eraseWindow)
        
        document.getElementById(eraseWindow)?.addEventListener('click', () => {
            this.globalWindow.dispatchEvent(evt)
        })
    }

    private  actionCrudpreventDefault(){
        let facedeActionCrud = document.getElementById(`${this.P}r-facede-action-crud`)
        facedeActionCrud?.addEventListener('click', (e) => e.preventDefault())
    }

    private  openActionswindow(){

        let actions = document.getElementById(`${this.P}${constIdBaseWindow.ACTIONS_WINDOW}`)

        actions?.addEventListener('click', (e) => {
            actions?.nextElementSibling?.classList.toggle('r-actions-window-active')
            actions?.nextElementSibling?.classList.toggle('r-actions-window')
        })
    }

    private alterTheme(){

        let rw = document.querySelector(`.${this.P}r-w`)

        let actions = document.getElementById(`${this.P}${constIdBaseWindow.ALTER_THEME}`)

        let theme = cookie.read('theme')

        if(theme == 'dark'){
            rw?.classList.add('dark-theme')
        }

        actions?.addEventListener('click', (e) => {

            rw?.classList.toggle('dark-theme')

            if(rw?.classList.contains('dark-theme')){
                document.cookie = "theme=dark"
            }
            else{
                document.cookie = "theme=light"
            }
        })
    }

    getPrincipalElementRucula(){
        return document.getElementById(`${this.P}${constIdBaseWindow.FORM_RUCULA_JS}`) as HTMLFormElement
    }
}