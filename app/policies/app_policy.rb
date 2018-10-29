class AppPolicy
  attr_reader :user, :app

  def initialize(user, app)
    @user = user
    @app = app
  end

  # def index?
  #   user.type == 'ReferralAgency' # RA can see all Applications
  # end

  def show?
    if user.type == 'ReferralAgency' # RA can see specific Application
      user.tenants.include?(app.info.tenant)
    else
      user.properties.each do |property|
        if property.applications.ids.include?(app.id)
          return true
        end
      end
      return false
    end 
  end

  def create?
    user.type == 'ReferralAgency' &&  user.tenants.include?(app.info.tenant)# RA can create an Applicatoin
  end

  def new?
    create?
  end

  def update?
    user.type == 'ReferralAgency' && user.tenants.ids.include?(app.tenant.id)# RA can update an Application of a tenant under them
  end

  def update_status? 
    !(user.type == 'ReferralAgency') && user.properties.applications.tenants.ids.include?(app.tenant.id) # <-- probably wrong: Only landlord can update status of an application of a tenant that's applied to them
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
        scope.all # if Referral Agency, can see applications associated with their HVI's
      else
        scope.all # if Landlord, can only check applications of HVI's that applied to your properties
      end
    end
  end
end