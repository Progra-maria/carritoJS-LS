//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let   articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //agrega los cursos cuando presionas 'Agregar Curso'
    listaCursos.addEventListener('click', agregarCurso);
    //elimina los cursos cuando presionas ' X '
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    })
}

//Funciones

function agregarCurso(e) {
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito') ){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    console.log (e.target.classList);
    if ( e.target.classList.contains('borrar-curso') ){
    const cursoId = e.target.getAttribute('data-id');
//Elimina del array articulosCarrito por el data-id

articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

carritoHTML(); //imprimir el nuevo carrito en el HTML

    }
}

// lee el contenido y extrae la info del curso

function leerDatosCurso(curso){
//console.log(curso);

//crear objeto con el contenido  del curso

const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id:     curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}
//revisa si un elememto ya existe en el carrito

const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
if (existe) {
    //agregamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if ( curso.id === infoCurso.id ){
            curso.cantidad++; //retorna el objeto actualizado
            return curso;
        }else {
            return curso; //retorna los objetos no duplicados
        }
    } );
    articulosCarrito = [...cursos];
}else{
    //agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
console.log(articulosCarrito);
}

//Agrega elementos al array del carrito


carritoHTML();

}

//Muestra el carrito de compras en el HTML

function carritoHTML() {

    //limpiar HTML
    limpiarHTML();

    //recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML =`
        <td><img src="${imagen}" width= "100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id=${id}> X </a></td>
        `;
        //agrega el Html del carrito en el tbody

        contenedorCarrito.appendChild(row);
    }

    )
    
}

//elimina los cursos del Tbody

function limpiarHTML(){

    //forma lenta
    //contenedorCarrito.innerHTML = '';

    //forma rápida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

