import {
  removeClassElements,
  removeClassElement,
  addClass,
  addClassElements,
  setTextElement,
} from "./modules/addRemoveClass.js";
import {
  validarArchivo,
  alertSucess,
  alertWarning,
  alertError,
  fileIsNull,
  cancelError,
} from "./modules/validarArchivo.js";

import { fileUpload } from "./modules/uploadFile.js";

document.addEventListener("DOMContentLoaded", () => {
  const dropZone = document.getElementById("dropeZone");
  const inputFile = document.getElementById("dragDrop");
  const bar = document.getElementById("bar");
  const numberProgress = document.getElementById("numberProgress");
  const cancel = document.getElementById("cancel");
  const ok = document.getElementById("ok");
  const hiddenElements = document.getElementsByClassName("elementsZone");
  const containerProgress = document.getElementById("containerProgress");
  const nameFile = document.getElementById("nameFile");
  let files = null;
  let controller = null;


  /*-----------------------Eventos--------------------------------*/
  addEvent(dropZone, "dragover", (event) => {
    event.preventDefault();
    addClassElements(hiddenElements, "opacity--element");
    addClass(dropZone, "change--label");
    console.log("Archivo sobre");
  });

  addEvent(dropZone, "dragleave", (event) => {
    event.preventDefault();
    removeClassElements(hiddenElements, "opacity--element");
    removeClassElement(dropZone, "change--label");
  });

  addEvent(dropZone, "drop", async (event) => {
    event.preventDefault();

    if (fileIsNull(files)) {
      files = event.dataTransfer.files;
      if (files.length > 0 && files.length < 2) {
        if (validarArchivo(files[0], "video/")) {
          removeClassElements(hiddenElements, "opacity--element");
          removeClassElement(dropZone, "change--label");
          removeClassElement(containerProgress, "hiddenElement");
          setTextElement(nameFile, files[0].name);
          alertSucess();
          controller = new AbortController();
          const status = await fileUpload(
            files[0],
            bar,
            numberProgress,
            controller
          );
          if (status == 200) {
            addClass(cancel, "hiddenElement");
            removeClassElement(ok, "hiddenElement");
          }
        } else {
          alertError();
          removeClassElements(hiddenElements, "opacity--element");
          removeClassElement(dropZone, "change--label");
        }
      } else {
        removeClassElements(hiddenElements, "opacity--element");
        removeClassElement(dropZone, "change--label");
        alertWarning();
      }
    } else {
      removeClassElements(hiddenElements, "opacity--element");
      removeClassElement(dropZone, "change--label");
    }
  });

  addEvent(dropZone, "change", async () => {
    if (fileIsNull(files)) {
      files = inputFile.files[0];
      if (validarArchivo(files, "video/")) {
        removeClassElement(containerProgress, "hiddenElement");
        setTextElement(nameFile, files.name);
        alertSucess();
        controller = new AbortController();
        const status = await fileUpload(files, bar, numberProgress, controller);
        if (status == 200) {
          addClass(cancel, "hiddenElement");
          removeClassElement(ok, "hiddenElement");
        }
      } else {
        alertError();
      }
    } else {
      removeClassElements(hiddenElements, "opacity--element");
      removeClassElement(dropZone, "change--label");
    }
  });

  cancel.addEventListener("click", async () => {
    if (controller) {
      controller.abort();
      cancelError();
      setTextElement(nameFile, null);
      inputFile.value = ""; // limpia el input file
      files = null;
      addClass(containerProgress, "hiddenElement");
    }
  });

  function addEvent(element, type, callback) {
    element.addEventListener(type, callback);
  }
});
