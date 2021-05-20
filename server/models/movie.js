'use strict';

module.exports = function(Movie) {
Movie.getAll = async function(limit, page, filter) {
    var response;
    response = Movie.find({limit: limit, skip: (page-1)*limit, where:filter});
    return response
  };

  Movie.getByIdOrName = async function(idorname){
    let response = Movie.find({where:{or:[{id:idorname},{name: idorname}]}})
    return response
  };

  Movie.deleteById = async function(id){
    Movie.destroyById(id);
    return
  };

  Movie.remoteMethod(
    'getAll', {
      http: {
        path: '/l/list',
        verb: 'get'
      },
      accepts:[
        {arg: 'limit', type: 'int', required: false },
        { arg: 'page', type: 'int',  required: false },
        { arg: 'filter', type: 'int',  required: false }
      ],
      returns: {
        arg: 'movies',
        type: 'array'
      }
    }
  );

  Movie.remoteMethod('getByIdOrName', {
    http: {path: '/g/:idorname', verb: 'get'},
    accepts:[
      {arg: 'idorname', type: 'string', required: true }
    ],
    returns: {arg: 'movie', type: 'object'}
  });

  Movie.remoteMethod('deleteById', {
    http: {path: '/g/:id', verb: 'delete'},
    accepts:[
      { arg: 'id', type: 'string', required: true }],
    returns: {arg: 'movieDeleted', type: 'string'}
  });
};
