import axios from 'axios';

var userAccessToken = '1234dkjasdf';
var userPhotos = axios.get(`${userAccessToken}/photos?type=uploaded`).then((res) => {
  console.log(res);
}).catch((e) => {
  console.log(e);
});


//Cloudinary
// cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });

//Cloud name: dmkyqvixg

//preset name:
// b4ydmdnn
