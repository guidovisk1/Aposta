export const endpoints = {
  USERS: {
    AUTH: 'auth',
    GET_ALL: 'usuarios',
  },
  EPI: {
    GET_ALL: 'epis',
    GET_BY_ID: 'epis',
    CREATE: 'epis',
    UPDATE: 'epis',
  },
  USER_GROUP: {
    GET_ALL: 'grupousuarios',
  },
  EQUIPMENT: {
    GET_ALL: 'equipamentos',
  },
  TOOL: {
    GET_ALL: 'ferramentas',
    CREATE: 'ferramentas',
    UPDATE: 'ferramentas',
  },
  TRAININGS: {
    GET_ALL: 'treinamentos',
    CREATE: 'treinamentos',
    UPDATE: 'treinamentos',
  },

  // The reason we have this kind of duplication is because I want to prevent too much effort
  // if for some reason those endpoints changes during the development.
};
