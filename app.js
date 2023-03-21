import colors from 'colors';
import { guardarDB, leerDb } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} from './helpers/inquirer.js';
import {Tareas} from './models/tareas.js';
 
 
console.clear();
 
const main = async () => {
  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDb();
 

  if ( tareasDB ){
    tareas.cargarTareasFromArray( tareasDB );
    //Establecer tareas
  }

  do {

    //Imprimir el menu
    opt = await inquirerMenu();
    
    switch (opt) {
      case '1':
        //crear opcion
        const desc = await leerInput('Description: ');
        console.log( desc );
        tareas.crearTarea( desc );
      break;

      case '2':
        tareas.listadoCompleto();
      break;

      case '3':
        
        tareas.listarPendientesCompletadas(  );
      break;

      case '4':
  
        tareas.listarPendientesCompletadas( false );
      break;

      case '5':
  
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletadas( ids );
      break;

      case '6':

        const id = await listadoTareasBorrar( tareas.listadoArr );
        if ( id !== '0'){
          const ok = await confirmar('Esta seguro??');
          if ( ok ){
            tareas.borrarTarea( id );
            console.log('Tarea borrada');
          }
        } 
      break;

    }

    guardarDB( tareas.listadoArr );

    await pausa();
  } while (opt !== '0');
};
 
main();