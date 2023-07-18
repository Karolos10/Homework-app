
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheclist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



/* const { mostrarMenu, pausa } = require('./helpers/mensajes'); */
require('colors');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {

        tareas.cargarTareasFromArry(tareasDB);

    }

    do {

        // imprimir el menu
        opt = await inquireMenu();

        switch (opt) {
            case '1':

                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);

                break;

            case '2':

                tareas.listadoCompleto();

                break;

            case '3':

                tareas.listarPendientesCompletadas();

                break;

            case '4':

                tareas.listarPendientesCompletadas(false);

                break;

            case '5':

                const ids = await mostrarListadoCheclist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
                
                break;

            case '6':

                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {

                    const ok = await confirmar('¿Estas seguro de eliminar la tarea?');
                    if (ok) {
                        tareas.borarTareas(id);
                        console.log();
                        console.log('Tarea eliminada correctamente');
                    }

                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();

        /* if( opt !== '0' ) await pausa(); */

    } while (opt !== '0');
}

main();