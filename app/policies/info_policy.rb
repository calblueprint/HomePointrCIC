class InfoPolicy
  attr_reader :user, :info

  def initialize(user, info)
    @user = user
    @info = info
  end

  def index?
    user.type == 'ReferralAgency' # RA can see all Infos
  end

  def show?
    user.type == 'ReferralAgency' # RA can see specific info
  end

  def create?
    user.type == 'ReferralAgency' # RA can create an Info
  end

  def new?
    create?
  end

  def update?
    user.type == 'ReferralAgency' # RA can update an Info
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
      scope.all
    end
  end
end