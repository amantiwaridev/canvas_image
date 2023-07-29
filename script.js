// FIRST ITERATION

// const img = new Image();
// img.src = "us30_image.png";
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// img.onload = function() {
//     canvas.width = img.width;
//     canvas.height = img.height;
//     // console.log(img.width, img.height);
//     // console.log(ctx);
//     ctx.drawImage(img, 0, 0, img.width, img.height);  // Draw at top-left corner
// };

// img.style.display = "none";
// let imageData = ctx.getImageData(0, 0, img.width, img.height).data;
// // console.log(imageData);
// // console.log(imageData.length);

// let elevationVal = [];
// elevationVal.width = img.width;
// elevationVal.height = img.height;
// for (let i = 0; i < imageData.length; i++) {
//     let color = imageData[i];
//     if(color === 0) {
//         elevationVal.push(0);
//     }else{
//         elevationVal.push(((color / 256) * (877 - 283)) + 283);
//     }
    
// }

// console.log(elevationVal);
// // ctx.putImageData(elevationVal, 0, 0, img.width, img.height);



// SECOND ITERATION

// const img = new Image();
// img.src = "us30_image.png";
// img.style.display = "none";
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// img.onload = function() {
//     canvas.width = img.width;
//     canvas.height = img.height;

//     ctx.drawImage(img, 0, 0, img.width, img.height); 

//     let imageData = ctx.getImageData(0, 0, img.width, img.height);
//     let data = imageData.data;

//     let elevationVal = [];
//     for (let i = 0; i < data.length; i += 4) {
//         let color = data[i]; // considering red channel only
//         let newVal;
//         if(color === 0) {
//             newVal = 0;
//         }else{
//             newVal = ((color / 256) * (877 - 283)) + 283;
//         }
//         elevationVal.push(newVal);

//         data[i] = newVal; // Red channel
//         data[i+1] = newVal; // Green channel
//         data[i+2] = newVal; // Blue channel
//         data[i+3] = 255; // Alpha channel
//     }
//     console.log(elevationVal);

//     ctx.putImageData(imageData, 0, 0); // put the new ImageData back onto the canvas
// };


// FINAL ITERATION- IT WORKS FOR ME

const img = new Image();
img.src = "us30_image.png";
img.style.display = "none";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width, img.height); 

    let imageData = ctx.getImageData(0, 0, img.width, img.height);
    let data = imageData.data;

    let minVal = 283, maxVal = 877; // min and max values for normalization
    let elevationVal = [];
    let buffer = new Uint8ClampedArray(data.length);
    for(let i = 0; i < canvas.height; i++) {
        for(let j = 0; j < canvas.width; j++) {
            let index = i * canvas.width * 4 + j * 4;
            let color = data[index]; // considering red channel only
            let value;
            if(color === 0) {
                value = 0;
            }else{
                value = ((color / 256) * (maxVal - minVal)) + minVal;
            }
            elevationVal.push(Math.round(value));
            value = (value - minVal) / (maxVal - minVal) * 256;
            buffer[index] = value;
            buffer[index + 1] = value;
            buffer[index + 2] = value;
            buffer[index + 3] = 255; // value>0?255:0;
        }
    }
    console.log(elevationVal);
    let newImageData = new ImageData(buffer, canvas.width, canvas.height);
    ctx.putImageData(newImageData, 0, 0);
    console.log(newImageData);
};
