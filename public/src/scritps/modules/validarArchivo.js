import Swal from "sweetalert2";

export function validarArchivo(file, type) {
  if (type == "video/") return file.type.startsWith(type);
}

export function fileIsNull(file){
  if (file==null)return true;
}


export function alertSucess() {
  Swal.fire({
    title: "Sucess!",
    text: "Archivo Valido!!",
    icon: "success",
    confirmButtonText: "Ok",
  });
}

export function alertError() {
  Swal.fire({
    title: "Error!",
    text: "Archivo invalido!!",
    icon: "error",
    confirmButtonText: "Ok",
  });
}

export function cancelError() {
  Swal.fire({
    title: "Cancel!",
    text: "Archivo cancelado!!",
    icon: "error",
    confirmButtonText: "Ok",
  });
}

export function alertWarning() {
  Swal.fire({
    title: "Warning!",
    text: "Sólo se permite un archivo a la vez!",
    icon: "warning",
    confirmButtonText: "Ok",
  });
}
