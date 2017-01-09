import big from '../assets/big.jpg';
import small from '../assets/small.jpg';
import '../styles/imageViewer.css';

const image = document.createElement('img');
image.src = small; // small is the actual base64 string, the actual data representation of the image, so you can put it in the <img>'s src attribute, and the image will render properly'

document.body.appendChild(image);

const bigImage = document.createElement('img');
bigImage.src = big;

document.body.appendChild(bigImage);
