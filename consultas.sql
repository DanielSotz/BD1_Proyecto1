
--consulta 1
select hospital.nombre, hospital.direccion, count(distinct victima.fecha_muerte) as Muertes from hospital
inner join tratamiento_victima on tratamiento_victima.hospital_idhospital=hospital.idhospital
inner join victima on victima.idvictima= tratamiento_victima.victima_idvictima
where victima.fecha_muerte is not null
group by hospital.nombre,hospital.direccion
order by muertes desc,nombre asc ;


----Consulta 2
select victima.nombre, victima.apellido from victima
inner join tratamiento_victima on tratamiento_victima.victima_idvictima= victima.idvictima
inner join tratamiento on tratamiento.idtratamiento=tratamiento_victima.tratamiento_idtratamiento
where victima.estado='En cuarentena' and tratamiento_victima.efectividad_vicitma > 5 and tratamiento.tratamiento='Transfusiones de sangre' 
group by victima.nombre, victima.apellido;


---Consulta 3 maso
select v.nombre,v.apellido, v.direccion, count(distinct asociado_idasociado) num_asociados from victima v
inner join contacto on contacto.victima_idvictima=v.idvictima
where v.fecha_muerte is not null
group by v.nombre,v.apellido,v.direccion
having count(distinct asociado_idasociado)> 3
order by num_asociados desc, v.nombre asc;


---Consulta 4
Select nombre, apellido from victima
inner join contacto on contacto.victima_idvictima=victima.idvictima
inner join tipo_contacto on tipo_contacto.idtipocontacto= contacto.tipo_contacto_idtipocontacto
where estado='Suspendida' and tipo_contacto.contacto='Beso'
group by nombre,apellido
having count(distinct asociado_idasociado)> 2
order by nombre asc;


--consulta 5
Select * from (Select nombre, apellido,count(*) from victima
inner join tratamiento_victima on tratamiento_victima.victima_idvictima=victima.idvictima
inner join tratamiento on tratamiento.idtratamiento=tratamiento_victima.tratamiento_idtratamiento
where tratamiento='Oxigeno'
group by nombre, apellido
order by nombre asc) WHERE ROWNUM BETWEEN 1 AND 5;

--consulta 6
select victima.nombre, victima.apellido,victima.fecha_muerte from victima
inner join registroubicacion r on r.victima_idvictima= victima.idvictima
inner join tratamiento_victima t on t.victima_idvictima= victima.idvictima
inner join tratamiento tr on tr.idtratamiento= t.tratamiento_idtratamiento
where r.ubicacionvictima='1987 Delphine Well' and fecha_muerte is not null and tr.tratamiento='Manejo de la presion arterial'
group by victima.nombre, victima.apellido,victima.fecha_muerte;

--consulta7
select v.nombre,v.apellido, v.direccion  from victima v
inner join tratamiento_victima tv on tv.victima_idvictima=v.idvictima
inner join contacto on contacto.victima_idvictima=v.idvictima
inner join asociado a on a.idasociado=contacto.asociado_idasociado
group by v.nombre,v.apellido,v.direccion
having count( tv.tratamiento_idtratamiento)= 2
order by nombre asc;

---consulta8
with cte as 
(
    select v.nombre,v.apellido,extract(month from v.fecha_sospecha )mes_sospecha,count(tv.idtratamientovictima)tratamientos from victima v
    inner join tratamiento_victima tv on tv.victima_idvictima=v.idvictima
    group by v.nombre,v.apellido,v.fecha_sospecha
    order by v.nombre asc
)
select * from cte t1
where tratamientos=(select max(tratamientos)from cte)
or tratamientos=(select min(tratamientos)from cte)
order by tratamientos desc;


--consulta9
