require('dotenv').config();
const { db, update } = require('../pgAdaptor');
const { ApolloError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bibliotecas = require('./loaders/bibliotecas');
const grupos_usuario = require('./loaders/grupos_usuario');
const { cloudinary } = require('../utils/cloudinary');

const uploadImage = async foto => {
  const data = await cloudinary.uploader.upload(foto, {
    upload_preset: 'devs',
  });
  return data.url;
};

const deleteImage = async imgUrl => {
  let exp_reg = /[/]+[A-Za-z0-9]*.(jpg)$/g;
  let respuesta = imgUrl.match(exp_reg);
  const id_cloudinary = respuesta[0].substring(1, respuesta[0].length - 4);
  const cloudinary_id = `dev_setups/${id_cloudinary}`;
  await cloudinary.uploader
    .destroy(cloudinary_id)
    .then(respuesta => {
      console.log(respuesta);
    })
    .catch(err => {
      console.log(err);
    });
};

const resolvers = {
  Query: {
    login: async (_, { usuario, password }) => {
      return db
        .one('SELECT * FROM usuarios WHERE usuario=$1 AND password=$2', [usuario, password])
        .then(res => {
          const token = jwt.sign({ id: res.id, codgo: res.codigo }, 'Fe$4r4G0n', {
            expiresIn: '1d',
          });
          return { token, usuario: res };
        })
        .catch(err => new ApolloError('Usuario y/o contraseña incorrectos.'));
    },
    verificar: (_, { token }) => {
      const { id } = jwt.verify(token, 'Fe$4r4G0n');
      return db.one('SELECT * FROM usuarios WHERE id=$1', [id]);
    },
    usuarios: (_, { input }) => {
      const { limit = 5, offset = 0, filter = '', sort = '' } = input || {};

      return db.any('SELECT * FROM usuarios ' + filter + ' ' + sort + ' LIMIT $1 OFFSET $2', [
        limit,
        offset,
      ]);
    },
    usuario: (_, { id, codigo }) =>
      db.one('SELECT * FROM usuarios WHERE id=$1 OR codigo=$2', [id, codigo]),
  },
  Mutation: {
    createUsuario: async (_, { input }) => {
      const { direcciones, foto, ...user } = input;
      if (foto) {
        const url = await uploadImage(foto);
        user.foto = url;
      }
      return db
        .tx(t =>
          db
            .one('INSERT INTO usuarios(${this:name}) VALUES(${this:csv}) RETURNING *', user)
            .then(usuario => {
              if (direcciones) {
                direcciones.forEach(dir => {
                  db.none('INSERT INTO direcciones(${this:name}) VALUES(${this:csv})', {
                    ...dir,
                    usuario_id: usuario.id,
                  });
                });
              }
              return t.batch([usuario]);
            })
        )
        .then(res => res[0]);
    },
    updateUsuario: async (_, { id, input }) => {
      const { direcciones, foto, ...user } = input;

      if (foto) {
        let url = db.oneOrNone('SELECT foto FROM usuarios WHERE id=$1', [id]);
        if (url) {
          await deleteImage(url);
        }
        url = await uploadImage(foto);
        user.foto = url;
      }
      
      return db
        .one(update(user, null, 'usuarios') + ' WHERE id=$1 RETURNING *', id)
        .then(usuario => {
          if (direcciones) {
            db.none('DELETE FROM direcciones WHERE usuario_id=$1', id).then(() => {
              direcciones.forEach(dir => {
                db.none('INSERT INTO direcciones(${this:name}) VALUES(${this:csv})', {
                  ...dir,
                  usuario_id: id,
                });
              });
            });
          }

          return usuario;
        });
    },
    deleteUsuario: (_, { id }) => {
      const imgUrl = db.oneOrNone('SELECT foto FROM usuarios WHERE id=$1', [id]);
      deleteImage(imgUrl);
      return db
        .none('DELETE FROM direcciones WHERE usuario_id=$1', id)
        .then(() => db.one('DELETE FROM usuarios WHERE id=$1 RETURNING id', id));
    },
  },
  Usuario: {
    biblioteca: _ => bibliotecas.load(_.biblioteca_id),
    grupo_usuario: _ => grupos_usuario.load(_.grupo_usuario_id),
    direcciones: _ => db.any('SELECT * FROM direcciones WHERE usuario_id =$1', _.id),
    prestamos: _ => db.any('SELECT * FROM prestamos WHERE usuario_id =$1', _.id),
    cuentas: _ => db.any('SELECT * FROM cuentas WHERE usuario_id =$1', _.id),
    bloqueos: _ => db.any('SELECT * FROM bloqueos WHERE usuario_id =$1', _.id)
  },
};

module.exports = resolvers;
