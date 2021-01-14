//functionalitati implementate
//1. - adaugarea elementelor de baza linie,elipsa, dreptunghi // coodonatele unde vor fi adaugate sunt random
//2. - selectarea colorii si grosimii liniei pentru adaugare
//3. - selecție și ștergere / modificare elemente existente (proprietăți: culoare și grosime linie, culoare
// dublu click stergere element / click dreapta aplicare setari pe elemnt selectat
//4. - mutare elemente utilizând mouse-ul
//5. - salvare in format svg 
//6. - export in format png

"use strict";


const bt1 = document.getElementById('btn1');
const bt2 = document.getElementById('btn2');
const colorPicker = document.getElementById('inputColor');
const colorPicker2 = document.getElementById('inputColor2');


//tratare evenimente de click pentru adaugarea unui cod hexa de culoare
bt1.addEventListener('click', function () {
    let color = document.getElementById("inputText").value;
    colorPicker.value = color;
})

bt2.addEventListener('click', function () {
    let color = document.getElementById("inputText2").value;
    colorPicker2.value = color;
})


//tratare eveniment de schimare a culorii din color-picker
colorPicker.addEventListener('change', function () {
    let color = document.getElementById("inputColor").value;
    document.getElementById("inputText").value = color
});


colorPicker2.addEventListener('change', function () {
    let color = document.getElementById("inputColor2").value;
    document.getElementById("inputText2").value = color
});



class SVGeditor {

    constructor(domElement) {
        this.domElement = domElement;
        this.svgns = "http://www.w3.org/2000/svg";

    }

    // setare width si height pentru div ul care contine elementul svg
    draw() {

        this.width = this.domElement.clientWidth;
        this.height = this.domElement.clientHeight;

        this.setSVG();
        this.drawCanvas();
    }

    //formatare element svg pe o afisare oarecum responsive
    setSVG() {

        this.svg = document.getElementById("canvasSVG1")
        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('height', this.height);
    }

    //desenare 'foaie' de lucru alba cu dimensiunile elementului svg
    drawCanvas() {

        let foaie = document.createElementNS(this.svgns, 'rect');
        foaie.setAttribute('id', 'foaie')
        foaie.setAttribute('x', 0);
        foaie.setAttribute('y', 0);
        foaie.setAttribute('height', this.height);
        foaie.setAttribute('width', this.width);
        foaie.setAttribute('fill', 'white');
        this.svg.appendChild(foaie);
        //console.log(foaie)

    }


    //creare element de tip cerc (si adaugare) la coordonate random in canvas - raza esta harcodata ca 100, stroke-ul si culoarea interioara se preiau din inputuri
    createCircle() {

        let element = document.createElementNS(this.svgns, 'circle');

        element.setAttribute('cx', (Math.random() * this.width));
        element.setAttribute('cy', (Math.random() * this.height));
        element.setAttribute('r', document.getElementById("elem-width").value);
        element.style.stroke = document.getElementById("inputText2").value;



        element.setAttribute('stroke-width', document.getElementById("stroke-width").value);
        element.style.fill = document.getElementById("inputText").value;

        this.svg.appendChild(element);

    }

    //acceasi abordare ca mai sus doar ca acum abordam cazul unui dreptunghi/patrat, latimea si inaltimea sunt predefinite
    createRectangle() {

        let element = document.createElementNS(this.svgns, 'rect');
        element.setAttribute('x', (Math.random() * this.width));
        element.setAttribute('y', (Math.random() * this.height));

        element.setAttribute('width', document.getElementById("elem-width").value);
        element.setAttribute('height', document.getElementById("elem-height").value);
        element.style.stroke = document.getElementById("inputText2").value;


        element.setAttribute('stroke-width', document.getElementById("stroke-width").value);
        element.style.fill = document.getElementById("inputText").value;


        this.svg.appendChild(element);

    }


    //creare si adaugare linie la coordonate random
    createLine() {

        let element = document.createElementNS(this.svgns, 'line');
        element.setAttribute('x1', (Math.random() * this.width));
        element.setAttribute('y1', (Math.random() * this.height));
        element.setAttribute('x2', (Math.random() * this.height));
        element.setAttribute('y2', (Math.random() * this.height));
        element.setAttribute('stroke', document.getElementById("inputText2").value);
        element.setAttribute('stroke-width', document.getElementById("stroke-width").value);


        this.svg.appendChild(element);

    }


}




//Definim si initializam un obiect de tip SVGeditor pentru a putea avea acces la functiile definite

const editorSvgDiv = document.getElementById("content");
const editorSvg = new SVGeditor(editorSvgDiv);
//initializarea foii pentru desenare 
editorSvg.draw();



//tratare evenimente pentru cateva butoane incluse in interfata 

const btnCircle = document.getElementById("createCircle");
btnCircle.addEventListener("click", () => {
    editorSvg.createCircle();
})

const btnRectangle = document.getElementById("createRectangle");
btnRectangle.addEventListener("click", () => {
    editorSvg.createRectangle();
})

const btnLine = document.getElementById("createLine");
btnLine.addEventListener("click", () => {
    editorSvg.createLine();
})







// link pt salvare ca svg si export ca png

let link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link);



// Salvare continut foaie de lucru in format .svg

let saveBtn = document.getElementById("save");

saveBtn.addEventListener('click', () => {

    let title = document.getElementById("title").value;
    let svg = document.getElementById("canvasSVG1");
    //salvez datele din elementul svg
    let data = new XMLSerializer().serializeToString(svg);
    //creez un obiect de tip Blob pentru ca elemntul sa poate fi utilizat de sistemul utilizatorului
    let blob = new Blob([data], { type: 'image/svg+xml' });
    //actualizez propeietate href cu folosind metoda createObjectURL
    link.href = URL.createObjectURL(blob);
    link.download = title.toString() + '.svg';
    link.click();


});


//Exportare abordare oarecum asemanatoare doar ca includem elementul canvas pe care vom desena continutul

let exportBtn = document.getElementById("export")

exportBtn.addEventListener('click', () => {


    let title = document.getElementById("title").value;

    let canvas = document.getElementById('canvas');

    let svg = document.getElementById("canvasSVG1")
    canvas.width = editorSvg.width;
    canvas.height = editorSvg.height;
    //asemanator salvez datele din elementul svg
    let data = new XMLSerializer().serializeToString(svg);
    let win = window.URL || window.webkitURL || window;

    //definim un obiect de tip Image cu datele din elementul svg pentru a-l putea desena mai apoi in canvas si descarca in format png
    let img = new Image();
    let blob = new Blob([data], { type: 'image/svg+xml' });
    let url = win.createObjectURL(blob);


    //adaugam sursa imaginii pentru a se putea apela onload
    img.src = url;

    //facem download pe imaginea desenata in canvas imediat ce browser ul reuseste sa o incarce
    img.onload = function () {

        //NU dorim sa afisam iar imaginea in canvas
        canvas.style = 'display:none'
        canvas.getContext('2d').drawImage(img, 0, 0);

        win.revokeObjectURL(url);

        //folosim toDataURL din canvas pentru a obtiniea imaginea in format png
        let uri = canvas.toDataURL('image/png');
        link.href = uri
        link.download = title + ".png"
        link.click();
        window.URL.revokeObjectURL(uri);

    };




})






//definirea unei clase pentru a putea selecta elementele desenata

class selector {
    constructor(svgCanvas) {

        //border element selectat
        let selectie = document.createElement('span');
        selectie.style.position = 'absolute';
        selectie.style.display = 'block';
        selectie.style.outline = 'solid 2px #228B22';
        selectie.style.pointerEvents = 'none';
        document.body.appendChild(selectie);

        let selected = null;

        //deoarece coodonatele clientX si clientY nu incep si coltul foii de lucru avem nevoi de un offset pe care il vom folosi la mutarea elementelor
        let offset = { x1: 0, x2: 0, y1: 0, y2: 0, x: 0, y: 0 };

        function updateSelection(elm) {
            if (elm.isSameNode(svgCanvas) || elm.getAttribute('id') == 'foaie') {

                //daca elementul selectat este svgCanvas( din index.html ) sau elementul foaie adaugat initial nu se va face afisa selectia
                // !! desi nu se va afisa selectia aceasta inca se va face, pt asta tratez aces caz la linia 285
                selectie.style.display = 'none'

                return;
            }

            // obtinem o valoare de tim DOMrect care contine toate detaliine despre selectia curenta inaltime/latine ,nr px pe axa x si y in functie de viewportul curent
            let rect = elm.getBoundingClientRect();

            selectie.style.left = rect.left + 'px';
            selectie.style.top = rect.top + 'px';
            selectie.style.width = rect.width + 'px';
            selectie.style.height = rect.height + 'px';

            selectie.style.display = 'block';
        }


        //selectia se face pe mouseover
        svgCanvas.addEventListener('mouseover', function (event) {

            let target = event.target;
            updateSelection(target);

        });


        svgCanvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let target = event.target;

            if (target.isSameNode(svgCanvas) === false) {
                if (target.tagName === 'circle') {

                    target.setAttribute('stroke-width', document.getElementById("stroke-width").value);
                    target.style.fill = document.getElementById("inputText").value;

                    target.style.stroke = document.getElementById("inputText2").value;
                    target.setAttribute('r', document.getElementById("elem-width").value);

                } else if (target.tagName === 'rect' && target.getAttribute('id') == 'foaie') {
                    //, putem modifica doar culoarea fundalului

                    target.style.fill = document.getElementById("inputText").value;

                    return
                }
                else if (target.tagName === 'rect') {



                    target.setAttribute('stroke-width', document.getElementById("stroke-width").value);
                    target.style.fill = document.getElementById("inputText").value;

                    target.style.width = document.getElementById("elem-width").value;
                    target.style.height = document.getElementById("elem-height").value;
                    target.style.stroke = document.getElementById("inputText2").value;


                }

                else {
                    target.setAttribute('stroke-width', document.getElementById("stroke-width").value);
                    target.style.stroke = document.getElementById("inputText2").value;
                }
            }

        })



        //stergere element tratare eveniment de doubleclick
        svgCanvas.addEventListener('dblclick', (event) => {
            let target = event.target;

            if (target.isSameNode(svgCanvas) === false) {
                if (target.tagName === 'circle') {
                    //console.log("test")
                    target.remove();
                } else if (target.tagName === 'rect' && target.getAttribute('id') == 'foaie') {
                    //tratam cazul in care elementul de tip svg foaie este selectat
                    return
                }
                else if (target.tagName === 'rect') {

                    target.remove();

                }

                else {
                    target.remove();
                }
            }
        })


        //calcularea offset ilor in functie de tipul de element selectat pe toata durata tinerii apasat a butonul click
        svgCanvas.addEventListener('mousedown', function (event) {

            let target = event.target;

            if (target.isSameNode(svgCanvas) === false) {

                if (target.tagName === 'circle') {

                    offset.x = parseFloat(target.getAttribute('cx')) - event.clientX;
                    offset.y = parseFloat(target.getAttribute('cy')) - event.clientY;

                } else if (target.tagName === 'rect') {
                    //console.log(parseFloat(target.getAttribute('x')));
                    //console.log((target.getAttribute('y')));
                    //console.log("clinet x"+event.clientX);
                    offset.x = parseFloat(target.getAttribute('x')) - event.clientX; //difenta dintre x ul formei selectate si x ul click uluui =>detarminam coordonata unde vrem sa mutam forma
                    //console.log("offset.x"+ offset.x)

                    offset.y = parseFloat(target.getAttribute('y')) - event.clientY;
                    // console.log(offset.x, offset.y)

                } else {
                    offset.x1 = parseFloat(target.getAttribute('x1')) - event.clientX;
                    //
                    offset.y1 = parseFloat(target.getAttribute('y1')) - event.clientY;

                    offset.x2 = parseFloat(target.getAttribute('x2')) - event.clientX;
                    offset.y2 = parseFloat(target.getAttribute('y2')) - event.clientY;


                }
                //elemntul pe care se tine click devine selectat
                selected = target;

            }

        });


        //tratam evenimentul in care butonul mouse ul nu mai este apasat
        svgCanvas.addEventListener('mouseup', function (event) {

            selected = null;

        });

        //tratam evenimentul de miscare a mouse ului in functie de elementul care este selectat
        // in functie de tipul elementului adaugam la coodonatele clientX si clientY offsetii calculati
        window.addEventListener('mousemove', function (event) {

            if (selected) {

                if (selected.tagName === 'circle') {

                    selected.setAttribute('cx', event.clientX + offset.x);
                    selected.setAttribute('cy', event.clientY + offset.y);

                }
                //tratare din nou a evenimentului in care elemntul este foaia de lucru
                else if (selected.tagName === 'rect' && selected.getAttribute('id') == 'foaie') {
                    return;

                }

                else if (selected.tagName === 'rect') {


                    selected.setAttribute('x', event.clientX + offset.x);
                    selected.setAttribute('y', event.clientY + offset.y);

                }

                else if (selected.tagName === 'line') {
                    selected.setAttribute('x1', event.clientX + offset.x1);
                    selected.setAttribute('y1', event.clientY + offset.y1);
                    selected.setAttribute('x2', event.clientX + offset.x2);
                    selected.setAttribute('y2', event.clientY + offset.y2);
                }


                updateSelection(selected);

            }

        });


    }
}

//definim si initializam obiectul de tip selector pentru a putea fi accesate functiile din cadrul evenimentelor tratate
let canvas1 = document.getElementById("canvasSVG1");
const Selector = new selector(canvas1)