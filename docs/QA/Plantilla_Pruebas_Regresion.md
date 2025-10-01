#  Plantilla de Pruebas de Regresión

---

##  Caso de prueba (Plantilla)

- **Nombre del test:**  ((NOMBRE DEL TEST))
- **Objetivo:** ((OBJETIVO))
- **Precondiciones:** ((PRECONDICIONES))

### Pasos a seguir:
1. ((PASO 1))
2. ((PASO 2))
3. ((PASO 3))
   ...

### Resultado esperado:
- ((RESULTADO ESPERADO))

### Estado del test:
- ((ESTADO)) [Pendiente / Aprobado / Fallido]

### Notas:
- ((NOTAS/COMENTARIOS))

---

##  Caso de prueba 1

- **Nombre del test:** Verificar login con credenciales válidas  
- **Objetivo:** Asegurar que un usuario registrado pueda iniciar sesión correctamente.  
- **Precondiciones:** Usuario registrado con correo y contraseña válidos.  

### Pasos a seguir:
1. Abrir la aplicación.  
2. Ir a la pantalla de login.  
3. Ingresar correo válido y contraseña válida.  
4. Presionar el botón “Iniciar sesión”.  

### Resultado esperado:
- El sistema redirige al dashboard principal.  

### Estado del test:
- Pendiente  

### Notas:
- Se usó el usuario de prueba `qa_user@test.com`.  

---

##  Caso de prueba 2

- **Nombre del test:** Verificar login con contraseña incorrecta  
- **Objetivo:** Validar que el sistema no permita acceso si la contraseña es incorrecta.  
- **Precondiciones:** Usuario registrado con correo válido.  

### Pasos a seguir:
1. Abrir la aplicación.  
2. Ir a la pantalla de login.  
3. Ingresar correo válido y contraseña incorrecta.  
4. Presionar el botón “Iniciar sesión”.  

### Resultado esperado:
- El sistema muestra un mensaje de error: “Credenciales inválidas” y no permite acceso.  

### Estado del test:
- Pendiente  

### Notas:
- Se probó con la contraseña `wrong123`.  

---

##  Resumen de pruebas de regresión

| **Nombre del test** | **Objetivo** | **Resultado esperado** | **Estado** |
|----------------------|--------------|------------------------|------------|
| Verificar login con credenciales válidas | Asegurar que un usuario registrado pueda iniciar sesión correctamente. | El sistema redirige al dashboard principal. | Pendiente |
| Verificar login con contraseña incorrecta | Validar que el sistema no permita acceso si la contraseña es incorrecta. | El sistema muestra un mensaje de error: “Credenciales inválidas”. | Pendiente |
