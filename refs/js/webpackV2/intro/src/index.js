const button = document.createElement('button');
button.innerText = 'Click me';
button.onclick = () => {
  System.import('./imageViewer')
    .then(module => {
      console.log(module);
    });
}

document.body.appendChild(button);
