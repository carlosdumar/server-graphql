const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  # Esto es un curso en el sistema
  type Curso {
    id: ID!
    titulo: String!
    # Esta es la descripcion del curso
    description: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creemos mas en los puntajes")
    comentarios: [Comentario]
  }

  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }
  enum  Genero {
    MASCULINO
    FEMENINO
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }
  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`

const resolvers = {
  Query: {
    cursos: () => {
      return [{
        id: 1,
        titulo: 'Curso de GraphQL',
        description: 'Aprendiendo GraphQL'
      }, {
        id: 2,
        titulo: 'Curso de PHP',
        description: 'Aprendiendo PHP'
      }]
    }
  },
  Curso : {
    profesor: () => {
      return {
        nombre: 'Pablo',
        nacionalidad: 'Argetina'
      }
    },
    comentarios: () => {
      return [{
        nombre: 'Carlos',
        cuerpo: 'Buen curso de graphql para principiantes'
      }, {
        nombre: 'Jose',
        cuerpo: 'no me gusto!'
      }]
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
