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

  get users() {
    return {
      delete: () => '/users/sign_out'
    }
  }

  get landlords() {
    return {
      update: (id) => '/landlords/' + id,
      delete: (id) => '/landlords/' + id,
    }
  }

  get referral_agencies() {
    return {
      update: (id) => '/referral_agencies/' + id,
      delete: (id) => '/referral_agencies/' + id,
    }
  }

  get applications() {
    return {
      create: '/api/applications',
      update: (id) => '/api/applications/' + id,
    }
  }
}
const APIRoutes = new ApiRoutes();
export default APIRoutes;