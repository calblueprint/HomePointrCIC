class TenantPolicy
  attr_reader :user, :tenant

  def initialize(user, tenant)
    @user = user
    @tenant = tenant
  end

  def show?
    if user.type == 'Landlord'
      tenant.info.applications.each do |app|
        if app.property.landlord == user
          return true
        end
      end
      return false
    else 
      user.tenants.exists?(tenant) # for RA # true only if tenant passed in belongs to the user 
    end  
  end

  def index?
    true #both RA and LL can see tenants, scope chooses which ones they are able to see
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    user.type == 'ReferralAgency' && user.tenants.ids.include?(tenant.id) #only RA can update Tenant, that's associated with them
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
      if user.type == 'ReferralAgency'
        scope.where(referral_agency: user) # if RA, can see only tenants associated with yourself
      else 
        scope.where(landlord: user) #if Landlord, can only see tenants that have applied to you!
      end
    end
  end
end 
