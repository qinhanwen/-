const MAX_WIDTH = 600; // 图片最大宽度
function compress(base64, quality, mimeType) {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    let offetX = 0; // 图片偏移值
    img.onload = () => {
      if (img.width > MAX_WIDTH) {
        canvas.width = MAX_WIDTH;
        canvas.height = (img.height * MAX_WIDTH) / img.width;
        offetX = (img.width - MAX_WIDTH) / 2;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      canvas
        .getContext("2d")
        .drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality);
      resolve(imageData);
    };
  });
}
