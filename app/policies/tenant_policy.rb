class TenantPolicy
  attr_reader :user, :tenant

  def initialize(user, tenant)
    @user = user
    @tenant = tenant
  end

  def show?
    user.tenants.include?(tenant) # true only if tenant passed in belongs to the user
  end

  def index?
    user.tenants.include?(tenant) # true only if tenant passed in belongs to the user
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    user.admin? && user.tenants.ids.include?(tenant.id) #only RA can update Tenant, that's associated with them
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.admin? 
        scope.where(referral_agency: user) # if RA, can see only tenants associated with yourself
      else 
        scope.where(landlord: user) #if Landlord, can only see tenants that have applied to you!
    end
  end
end