
--Insertando en asociado
insert into asociado(nombre,apellido)
select distinct nombre_asociado, apellido_asociado from temporal where nombre_asociado is not null;

--Insertar en tipo_contacto
insert into tipo_contacto (contacto)
select distinct contacto_fisico from temporal where contacto_fisico is not null;

--Insertar en hospital
insert into hospital (nombre,direccion)
select distinct nombre_hospital, direccion_hospital from temporal where nombre_hospital is not null;

--insertar tratamiento
insert into tratamiento (tratamiento,efectividad)
Select distinct tratamiento,efectividad from temporal where tratamiento is not null;


-insertar victimas
insert into victima(nombre,apellido,direccion,fecha_sospecha,fecha_confirmacion,fecha_muerte,estado)
select distinct nombre_victima,apellido_victima,direccion_victima,fecha_primera_sospecha,fecha_confirmacion,fecha_muerte,estado_victima from temporal
where nombre_victima is not null

--insertar registro ubicaciones
insert into registroubicacion(ubicacionvictima,fecha_llegada,fecha_retiro,victima_idvictima)
select distinct ubicacion_victima,fecha_llegada,fecha_retiro, victima.idvictima from temporal
inner join victima on temporal.nombre_victima = victima.nombre and temporal.apellido_victima =victima.apellido
where ubicacion_victima is not null;

--insertar contacto
insert into contacto (fecha_conocio,fecha_inicio_contacto,fecha_fin_contacto,victima_idvictima,asociado_idasociado,tipo_contacto_idtipocontacto)
select distinct fecha_conocio,fecha_inicio_contacto,fecha_fin_contacto,idvictima,idasociado,idtipocontacto from temporal
inner join victima on temporal.nombre_victima = victima.nombre and temporal.apellido_victima =victima.apellido
inner join asociado on temporal.nombre_asociado = asociado.nombre and temporal.apellido_asociado =asociado.apellido
inner join tipo_contacto on temporal.contacto_fisico = tipo_contacto.contacto
where fecha_conocio is not null and fecha_inicio_contacto is not null and fecha_fin_contacto is not null;


--- insertar tratamiento victima
insert into tratamiento_victima(fecha_inicio_tratamiento,fecha_fin_tratamiento,efectividad_vicitma,hospital_idhospital,tratamiento_idtratamiento,victima_idvictima)
select distinct fecha_inicio_tratamiento, fecha_fin_tratamiento,efectividad_en_victima,idhospital,idtratamiento,idvictima from temporal
inner join hospital on temporal.nombre_hospital=hospital.nombre and temporal.direccion_hospital=hospital.direccion
inner join tratamiento on temporal.tratamiento=tratamiento.tratamiento
inner join victima on temporal.nombre_victima = victima.nombre and temporal.apellido_victima =victima.apellido
where fecha_inicio_tratamiento is not null and fecha_fin_tratamiento is not null;