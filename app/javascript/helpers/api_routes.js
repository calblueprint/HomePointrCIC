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

  get referral_agencies() {
    return {
      update: (id) => '/api/referral_agencies/' + id,
      delete: (id) => '/api/referral_agencies/' + id,
    }
  }

  get landlords() {
    return {
      update: (id) => '/api/landlords/' + id,
      delete: (id) => '/api/landlords/' + id,
    }
  }

  get users() {
    return {
      delete: (id) => '/api/users/' + id,
    }
  }
}
const APIRoutes = new ApiRoutes();
export default APIRoutes;