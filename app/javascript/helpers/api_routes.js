class ApiRoutes {
  get properties() {
    return {
      create: '/api/properties',
      update: (id) => '/api/properties/' + id,
      delete: (id) => '/api/properties/' + id,
    }
  }

  get tenants() {
    return {
      create: '/api/tenants',
      update: (id) => '/api/tenants/' + id,
      delete: (id) => '/api/tenants/' + id,
    }
  }

  get applications() {
    return {
      update: (id) => '/api/applications/' + id,
    }
  }
}
const APIRoutes = new ApiRoutes();
export default APIRoutes;