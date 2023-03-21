const express = require('express')
const oracledb = require('oracledb');
const app = express();
const port = 3000;
var password = 'xelaju11';
var sqlLoader = require("sql-loader");

async function consulta1(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "danisotz",
      password: password,
      connectString: "35.226.237.240:1521/ORCL18"
    });

    console.log('connected a la bd');
    
    result = await connection.execute(`select hospital.nombre, hospital.direccion, count(distinct victima.fecha_muerte) as Muertes from hospital 
    inner join tratamiento_victima on tratamiento_victima.hospital_idhospital=hospital.idhospital 
    inner join victima on victima.idvictima= tratamiento_victima.victima_idvictima where victima.fecha_muerte is not null
    group by hospital.nombre,hospital.direccion order by muertes desc,nombre asc`);

  } catch (err) {
    
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        
        await connection.close();
        console.log('coneccion cerrada exitosamente :)');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      
      return res.send('sin resultados en el query :(');
    } else {
      
      return res.send(result.rows);
    }

  }
}

app.get('/consulta1', function (req, res) {
  consulta1(req, res);
})

//CONSULTA 2
async function consulta2(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`select victima.nombre, victima.apellido from victima 
      inner join tratamiento_victima on tratamiento_victima.victima_idvictima= victima.idvictima
      inner join tratamiento on tratamiento.idtratamiento=tratamiento_victima.tratamiento_idtratamiento
      where victima.estado='En cuarentena' and tratamiento_victima.efectividad_vicitma > 5 and tratamiento.tratamiento='Transfusiones de sangre'
      group by victima.nombre, victima.apellido`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
app.get('/consulta2', function (req, res) {
  consulta2(req, res);
})


//CONSULTA 3
async function consulta3(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`select v.nombre,v.apellido, v.direccion, count(distinct asociado_idasociado) num_asociados from victima v
      inner join contacto on contacto.victima_idvictima=v.idvictima
      where v.fecha_muerte is not null
      group by v.nombre,v.apellido,v.direccion
      having count(distinct asociado_idasociado)> 3
      order by num_asociados desc, v.nombre asc`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
app.get('/consulta3', function (req, res) {
   consulta3(req, res);
 })


//CONSULTA 4
async function consulta4(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`Select nombre, apellido from victima
      inner join contacto on contacto.victima_idvictima=victima.idvictima
      inner join tipo_contacto on tipo_contacto.idtipocontacto= contacto.tipo_contacto_idtipocontacto
      where estado='Suspendida' and tipo_contacto.contacto='Beso'
      group by nombre,apellido
      having count(distinct asociado_idasociado)> 2
      order by nombre asc`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta4', function (req, res) {
    consulta4(req, res);
  })


//CONSULTA 5
async function consulta5(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`Select * from (Select nombre, apellido,count(*) from victima
      inner join tratamiento_victima on tratamiento_victima.victima_idvictima=victima.idvictima
      inner join tratamiento on tratamiento.idtratamiento=tratamiento_victima.tratamiento_idtratamiento
      where tratamiento='Oxigeno'
      group by nombre, apellido
      order by nombre asc) WHERE ROWNUM BETWEEN 1 AND 5`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta5', function (req, res) {
    consulta5(req, res);
  })


//CONSULTA 6
async function consulta6(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`select victima.nombre, victima.apellido,victima.fecha_muerte from victima
      inner join registroubicacion r on r.victima_idvictima= victima.idvictima
      inner join tratamiento_victima t on t.victima_idvictima= victima.idvictima
      inner join tratamiento tr on tr.idtratamiento= t.tratamiento_idtratamiento
      where r.ubicacionvictima='1987 Delphine Well' and fecha_muerte is not null and tr.tratamiento='Manejo de la presion arterial'
      group by victima.nombre, victima.apellido,victima.fecha_muerte`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta6', function (req, res) {
    consulta6(req, res);
  })

//CONSULTA 7
async function consulta7(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`select v.nombre,v.apellido, v.direccion  from victima v
      inner join tratamiento_victima tv on tv.victima_idvictima=v.idvictima
      inner join contacto on contacto.victima_idvictima=v.idvictima
      inner join asociado a on a.idasociado=contacto.asociado_idasociado
      group by v.nombre,v.apellido,v.direccion
      having count( tv.tratamiento_idtratamiento)= 2
      order by nombre asc`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta7', function (req, res) {
    consulta7(req, res);
  })


  //CONSULTA 8
  async function consulta8(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`with cte as 
      (
          select v.nombre,v.apellido,extract(month from v.fecha_sospecha )mes_sospecha,count(tv.idtratamientovictima)tratamientos from victima v
          inner join tratamiento_victima tv on tv.victima_idvictima=v.idvictima
          group by v.nombre,v.apellido,v.fecha_sospecha
          order by v.nombre asc
      )
      select * from cte t1
      where tratamientos=(select max(tratamientos)from cte)
      or tratamientos=(select min(tratamientos)from cte)
      order by tratamientos desc`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta8', function (req, res) {
    consulta8(req, res);
  })


//CONSULTA 9
async function consulta9(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`select hospital.nombre, hospital.direccion, count(distinct victima.fecha_muerte) as Muertes from hospital 
      inner join tratamiento_victima on tratamiento_victima.hospital_idhospital=hospital.idhospital 
      inner join victima on victima.idvictima= tratamiento_victima.victima_idvictima where victima.fecha_muerte is not null
      group by hospital.nombre,hospital.direccion order by muertes desc,nombre asc`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta9', function (req, res) {
    consulta9(req, res);
  })


//CONSULTA 10

  async function consulta10(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`select hospital.nombre, hospital.direccion, count(distinct victima.fecha_muerte) as Muertes from hospital 
      inner join tratamiento_victima on tratamiento_victima.hospital_idhospital=hospital.idhospital 
      inner join victima on victima.idvictima= tratamiento_victima.victima_idvictima where victima.fecha_muerte is not null
      group by hospital.nombre,hospital.direccion order by muertes desc,nombre asc`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/consulta10', function (req, res) {
    consulta10(req, res);
  })


//eliminar temporal
async function eliminarTempo(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`truncate TABLE temporal`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/eliminarTempo', function (req, res) {
    eliminartempo(req, res);
  })


//eliminar modelo
async function eliminarModelo(req, res) {
    try {
      connection = await oracledb.getConnection({
        user: "danisotz",
        password: password,
        connectString: "35.226.237.240:1521/ORCL18"
      });
  
      console.log('connected a la bd');
      
      result = await connection.execute(`truncate table temporal`);
  
    } catch (err) {
      
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          
          await connection.close();
          console.log('coneccion cerrada exitosamente :)');
        } catch (err) {
          console.error(err.message);
        }
      }
      if (result.rows.length == 0) {
        
        return res.send('sin resultados en el query :(');
      } else {
        
        return res.send(result.rows);
      }
  
    }
  }
  
  app.get('/eliminarModelo', function (req, res) {
    eliminarModelo(req, res);
  })





  app.get('/ejecutarsql', function (req, res) {
    consulta1(req, res);
  })










app.listen(port, () => console.log("OracleRestApi app listening on port %s!", port))