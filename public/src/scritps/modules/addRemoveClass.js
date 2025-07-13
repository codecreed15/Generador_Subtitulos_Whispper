export function removeClassElement(element, classElement){
      element.classList.remove(classElement);
}

export function addClass(element, classElement){
      element.classList.add(classElement);
}

export function removeClassElements(elements, classElements){
     for (let element of elements) {
      element.classList.remove(classElements);    
    }
}

export function addClassElements(elements, classElements){
     for (let element of elements) {
      element.classList.add(classElements);    
    }
}

export function setTextElement(element,text){
      element.textContent = text;
}