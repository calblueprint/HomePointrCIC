class TenantPolicy
  attr_reader :user, :tenant

  def initialize(user, tenant)
    @user = user
    @tenant = tenant
  end

  def index?
    user.admin? # RA can see all tenants
  end

  def show?
    user.admin? # RA can see specific tenant
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    false
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
        scope.where(tenant_id in RA tenants?) # if RA, can see only tenants associated with yourself
      else 
        scope.where() #if Landlord, can only see tenants that have applied to you!
    end
  end
end