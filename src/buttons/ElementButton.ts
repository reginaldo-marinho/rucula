import { button } from '../entities/form/button';
import { ElementBase } from './ElementBase';
import { ElementStrategy } from './ElementEstrategy';
import { createIcon } from './IconElement';

export class ElementButton extends ElementBase implements ElementStrategy{

    createElement(button:button){      
        this.element = document.createElement('button');
        this.element.classList.add("r-b-i");
        this.element.textContent = String(button.text);
        this.element.appendChild(createIcon(button));
        this.addColor(button.color);
        this.addDataIdAttribute(button);
        return this.element;
    }
}
