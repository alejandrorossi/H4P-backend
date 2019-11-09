
var roles = {};

roles.list = [
  {
    id: "refugio",
    name: "Refugio",
    description: "",
    //Resource no se esta utilizando.
    //Uso: para ver que permisos tiene en las rutas especificadas.
    resource : [
      {
        //Ejemplo de ruta: pet
        id : 'pet', 
        permissions: ['create', 'read', 'update', 'delete']
      }
    ]
  },
  {
    id: "postulante",
    name: "Postulante",
    description: "",
    resource : []
  }
];

// Metodos
roles.getIdsRoles = () => {
  let retRoles = [];
  for(let r of roles.list){
    retRoles.push(r.id);
  }
  return retRoles;
}

module.exports = roles;