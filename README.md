Usuario Admin, para pruebas

Username:Admintest2
Password:Test1234

# Gestión de Empleados y Departamentos

Este proyecto es una aplicación web para la gestión de **empleados** y **departamentos** en una organización. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) tanto para empleados como para departamentos, ofreciendo una **interfaz de usuario intuitiva**.

---

## Funcionalidades principales

### 1. Gestión de Departamentos

- **Agregar departamentos:** Permite registrar un nuevo departamento con información como nombre, alcalde, población, fecha de fundación y bandera.
- **Actualizar departamentos:** Seleccionando la tarjeta del departamento, se puede modificar su información directamente.
- **Eliminar departamentos:** Cada tarjeta de departamento incluye un botón para eliminarlo de la base de datos.
- **Listado de departamentos:** Visualización de todos los departamentos existentes en la base de datos.

### 2. Gestión de Empleados

- **Agregar empleados:** Formulario para registrar nuevos empleados, incluyendo nombre, apellidos, edad, foto de perfil, contraseña y departamento asociado.
- **Actualizar empleados:** Seleccionando la tarjeta del empleado, se puede modificar la información existente.
- **Eliminar empleados:** Posibilidad de eliminar empleados desde la tarjeta correspondiente.
- **Filtrar empleados por departamento:** La interfaz permite mostrar solo los empleados de un departamento seleccionado.

### 3. Interfaz de Usuario

- La aplicación está organizada en **tarjetas (cards)** para cada departamento y empleado.
- **Selección de tarjeta:** Para realizar cualquier acción de edición o eliminación, se debe seleccionar la tarjeta correspondiente.
- **Acciones al final de la página:** Al seleccionar un departamento o empleado, aparecerá una tarjeta nueva al final de la página que permitirá realizar las acciones deseadas (editar o eliminar).
- **Formularios separados:** Formulario independiente para agregar o actualizar empleados y otro para departamentos, optimizando la usabilidad.

### 4. Funciones de Backend

CRUD completo para departamentos y empleados usando MongoDB y Mongoose.

**Endpoints principales:**

# Departamentos
GET /departamentos               # Obtiene todos los departamentos
POST /departamentos              # Crea un nuevo departamento
PUT /departamentos/:id           # Actualiza un departamento existente
DELETE /departamentos/:id        # Elimina un departamento

# Usuarios
GET /usuarios                    # Obtiene todos los usuarios
GET /usuarios/departamento/:name # Obtiene todos los usuarios de un departamento específico
POST /usuarios                   # Crea un nuevo usuario
PUT /usuarios/:id                # Actualiza un usuario existente
DELETE /usuarios/:id             # Elimina un usuario

### 5. Validaciones y Seguridad

Se excluye información sensible como contraseñas en las respuestas de la API.
Validación de existencia de departamentos antes de asociar empleados.
Confirmaciones antes de eliminar registros mediante ventanas emergentes (SweetAlert).

### Tecnologías utilizadas

- Frontend: Angular 20, TypeScript, HTML, CSS
- Backend: Node.js, Express.js, Mongoose
- Base de datos: MongoDB Atlas

Otros: SweetAlert para alertas, Vite para el servidor de desarrollo

Uso de la aplicación
Iniciar el backend con Node.js
npm install
npm run dev

Iniciar el frontend con Angular y Vite
npm install
npm start

Interfaz de usuario

Selecciona un departamento o empleado desde las tarjetas.

Al final de la página aparecerá una tarjeta para editar o eliminar.

Formularios separados permiten agregar o actualizar empleados y departamentos.
