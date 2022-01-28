
function setup() {
    containerSection = document.createElement('section');
    containerSection.classList.add("container");
    document.body.appendChild(containerSection);

    let image = new Image(400, 400); // imports image to JavasScript
    image.src = "code.png";
    containerSection.appendChild(image);
    
    
}

setup();

