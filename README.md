# FocusPocus

FocusPocus es una extensión de navegador innovadora diseñada para mejorar la productividad. Bloquea sitios web distractores durante las horas de trabajo y te ayuda a organizar tus tareas diarias.

## Características

- **Bloqueo de Sitios Web**: Configura sitios web para bloquear durante las horas de trabajo.
- **Gestión de Tareas**: Añade y gestiona tus tareas diarias directamente desde la extensión.

## Instalación

Para instalar FocusPocus, sigue estos pasos:

1. Descarga el código fuente de este repositorio.
2. Abre `chrome://extensions/` en tu navegador Chrome.
3. Habilita el modo de desarrollador y carga la extensión descomprimida.

## Uso

Una vez instalada la extensión FocusPocus, su funcionalidad se puede aprovechar de la siguiente manera:

### Bloqueo de Sitios Web

1. **Configuración de Sitios para Bloquear**: Haz clic en el ícono de la extensión en tu navegador. En el campo proporcionado, ingresa la URL del sitio web que deseas bloquear y haz clic en 'Bloquear'.
2. **Activar/Desactivar Bloqueo**: Puedes activar o desactivar el bloqueo de sitios web en cualquier momento utilizando el botón 'Activar bloqueo'/'Desactivar bloqueo' en la interfaz de la extensión.
3. Cuando intentas acceder a un contenido bloqueado, se mostrará un panel de gestión de tareas para que mantengas tus objetivos claros y ordenados. 

### Gestión de Tareas

1. **Añadir Tareas**: En la misma interfaz, puedes añadir tareas escribiendo en el campo de texto y haciendo clic en 'Agregar'.
2. **Visualización de Tareas**: Las tareas añadidas se mostrarán en una lista debajo del campo de entrada.
3. **Eliminar Tareas**: Puedes eliminar tareas de la lista haciendo clic en el botón 'Eliminar' junto a cada tarea.

Recuerda que todas las configuraciones y tareas se guardan localmente, por lo que estarán disponibles incluso después de reiniciar el navegador.

## Lógica del Código

El proyecto "FocusPocus" se compone de varios componentes clave que trabajan en conjunto para proporcionar su funcionalidad:

### JavaScript Background Script (`background.js`)

Este script se ejecuta en el fondo del navegador y es el núcleo de la extensión. Sus funciones principales incluyen:

- **Interceptar Solicitudes de Navegación**: Utiliza `chrome.webRequest.onBeforeRequest` para interceptar las solicitudes de navegación.
- **Redirección de Sitios Bloqueados**: Si un sitio está en la lista de bloqueo y el bloqueo está activo, redirige la solicitud a una página personalizada.
- **Gestión del Estado del Bloqueo**: Escucha los cambios en la lista de sitios bloqueados y en el estado de activación/desactivación del bloqueo.

### Popup Script (`popup.js`)

Controla la interfaz de usuario de la extensión que aparece al hacer clic en su ícono. Sus responsabilidades incluyen:

- **Manejo de la Lista de Bloqueo**: Permite al usuario añadir o eliminar sitios web de la lista de bloqueo.
- **Activación/Desactivación del Bloqueo**: Permite al usuario activar o desactivar el bloqueo de sitios web.
- **Gestión de Tareas**: Facilita la adición, visualización y eliminación de tareas.
- **Almacenamiento Persistente**: Utiliza `chrome.storage.sync` para almacenar y recuperar la lista de sitios bloqueados, el estado del bloqueo y las tareas del usuario.

### HTML Popup (`popup.html`)

Proporciona la estructura de la interfaz de usuario para la extensión, incluyendo:

- **Campos de Entrada**: Para ingresar sitios web y tareas.
- **Botones de Acción**: Para realizar acciones como bloquear sitios y agregar tareas.

### Content Scripts (`blocked.js`)

Estos scripts se ejecutan en el contexto de las páginas bloqueadas y permiten:

- **Mostrar una Interfaz Personalizada**: En lugar de la página web original bloqueada, se muestra una interfaz donde los usuarios pueden gestionar sus tareas.


## Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar esta extensión, no dudes en abrir un issue o enviar un pull request.


## Contacto

Para preguntas o colaboraciones, contáctame al siguiente correo: [francisco@laurachile.com](mailto:francisco@laurachile.com).
