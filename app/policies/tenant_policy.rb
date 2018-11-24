class TenantPolicy
  attr_reader :user, :tenant

  def initialize(user, tenant)
    @user = user
    @tenant = tenant
  end

  # Returns true if a landlord if viewing a tenant that has applied to one of their properties, 
  # or if a referral agency is viewing one of their own tenants.
  def show?
    if user.type == 'Landlord'
      tenant.info.applications.each do |app|
        if app.property.landlord == user
          return true
        end
      end
      return false
    else 
      user.tenants.include?(tenant) 
    end  
  end

  def index?
    true 
  end

  def create?
    user.type == 'ReferralAgency' && tenant.referral_agency == user
  end

  def new?
    user.type == 'ReferralAgency'
  end

  def update?
    user.type == 'ReferralAgency' && user.tenants.include?(tenant) 
  end

  def edit?
    update?
  end

  def destroy?
    create?
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
        redirect_to errors_show_path
      end
    end
  end
end 
