// import fs from 'fs';
// import { uploadImagesToBlobStore } from '@common_functions/uploadImagesToBlobStore';
// import path from 'path'

// const getRandomImages = (imageFolderPath, numImages) => {
//   // Read all files in the image folder
//   const files = fs.readdirSync(imageFolderPath);

//   // Shuffle the files randomly
//   const shuffledFiles = files.sort(() => Math.random() - 0.5);

//   // Select the top numImages files
//   const selectedFiles = shuffledFiles.slice(0, numImages);

//   // Return the selected file paths
//   return selectedFiles.map(file => `${imageFolderPath}/${file}`);
// };

// // Function to check if a file has an image extension (you can customize this function)
// function isImageFile(fileName) {
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//     const ext = path.extname(fileName).toLowerCase();
//     return imageExtensions.includes(ext);
//   }
  
//   // Function to determine the MIME type based on the file extension
//   function getMimeType(fileName) {
//     const ext = path.extname(fileName).toLowerCase();
//     switch (ext) {
//       case '.jpg':
//       case '.jpeg':
//         return 'image/jpeg';
//       case '.png':
//         return 'image/png';
//       case '.gif':
//         return 'image/gif';
//       default:
//         return 'application/octet-stream'; // default to binary data if MIME type is unknown
//     }
//   }

// export  async function GET(req, res) {
//   if (req.method === 'GET') {
//     console.log('Got request')
//     // Enter folder route here
//     const imageFolderPath = 'ROUTE TO FOLDER '; // Path to your image folder
//     const numImages = 3; // Number of images to select

//     const imageFiles = getRandomImages(imageFolderPath, numImages);
//     console.log(imageFiles)

//     const imagesData = []
//     for (const filePath of imageFiles) {
//         const fileName = path.basename(filePath)
//         const mimeType = getMimeType(fileName);
//         const fileObject = new File([fs.readFileSync(filePath)], fileName, { type: mimeType });
//         imagesData.push(fileObject)
//     }
//     console.log('All Images',imagesData);
//     const imageURLs = await uploadImagesToBlobStore(imagesData)
//     console.log(imageURLs)
//     const jsonString = JSON.stringify(imageURLs);
//     console.log(jsonString)

//     // Write JSON string to a text file (optional)
//     fs.writeFileSync('image_urls.txt', jsonString);

//     return new Response(JSON.stringify(jsonString), {status: 201})
//   } else {
//     return new Response("Failed to add upload images!", {status: 500} )  }
// }
