class AppPolicy
  attr_reader :user, :app

  def initialize(user, app)
    @user = user
    @app = app
  end

  def index?
    user.type == 'ReferralAgency' # RA can see all Applications
  end

  def show?
    user.type == 'ReferralAgency' # RA can see specific Application
  end

  def create?
    user.type == 'ReferralAgency' # RA can create an Applicatoin
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
      if user.admin?
        # if Referral Agency, can see appli
      else

      end
    end
  end
end