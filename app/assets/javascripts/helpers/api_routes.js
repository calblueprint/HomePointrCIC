class ApiRoutes {
  get properties() {
    return {
      get: '/properties',
      create: '/api/properties',
      update: (id) => '/api/properties/' + id,
    }
  }

  get tenants() {
    return {
      get: '/tenants',
      create: '/api/tenants',
      update: (id) => '/api/tenants/' + id,
    }
  }
}
const APIRoutes = new ApiRoutes();
