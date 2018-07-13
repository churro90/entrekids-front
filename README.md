# AngularSrc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

Arquitectura:

|
-admin	
|
-component
|
-compras-usuario	
|
directives	
|
guards	
|
perfil-proveedor
|
perfil-usuario
|
pipes	
|
resultados-buscador	
|
services

En general los titulos son descriptivos por si mismos, excepto component, el cual incluye vistas como el home, landing de proveedores, footer, etc. Hay algunos que quedaron obsoletos al 13/07/2018 como login y login proveedor, no me he dado el tiempo de hacer un refactor de los archivos.

Por su parte 'directives' contiene un directive de autocomplete de google maps para las direcciones de las actividades
'Pipes' contiene los filtros para las actividades (filtro-horario, filtro de comunas, etc)
'Services' genera la conexión entre el front y el back. La obtención del perfil del usuario, sus actividades, etc, quedo todo dentro de auth.service (probablemente haya que separar lo que sea autenticación de datos del usuario en el futuro)

