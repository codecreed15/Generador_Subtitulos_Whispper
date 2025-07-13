import axios from "axios";

export function fileUpload(file, bar, numberProgress, controller) {
  const formData = new FormData();
  const signal = controller.signal;

  formData.append("video", file);

  const config = {
    
    signal,
    onUploadProgress: (progressEvent) => {
      const percentage = (progressEvent.loaded / progressEvent.total) * 100;
      // Mostrar hasta 95%
      const limitedPercentage = Math.min(percentage, 95);

      bar.setAttribute("value", limitedPercentage);
      numberProgress.textContent = `${Math.floor(limitedPercentage)}%`;
    },
  };

  return axios
    .post("http://localhost:3000/upload", formData, config)
    .then((res) => {
      
      // console.log(res);
      bar.setAttribute("value", 100);
      numberProgress.textContent = "100%";
      return res.status;
    })
    .catch((error) => {
      if (axios.isCancel(error) || error.name === "AbortError") {
        console.log("Subida cancelada correctamente.");
        
      bar.setAttribute("value", 0);
      numberProgress.textContent = `0%`;
      } else {
        console.error("Error en la subida:", error);
      }
    });
}
