class ApiRoutes {
  get properties() {
    return {
      create: '/api/properties',
      update: (id) => '/api/properties/' + id
    }
  }
}
const APIRoutes = new ApiRoutes();
