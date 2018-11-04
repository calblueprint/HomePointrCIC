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
      user.tenants.ids.include?(tenant.id) 
    end  
  end

  def index?
    true 
  end

  def create?
    user.type == 'ReferralAgency' && tenant.referral_agency == user
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
    user.type == 'ReferralAgency' && tenant.referral_agency == user
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user.type == 'ReferralAgency'
        scope.where(referral_agency: user) 
      else 
        scope.where(landlord: user) 
      end
    end
  end
end 
