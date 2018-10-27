class LandlordPolicy
  attr_reader :user, :landlord

  def initialize(user, landlord)
    @user = user
    @landlord = landlord
  end

  def index?
    user.type == 'ReferralAgency' # RA can see all landlords
  end

  def show?
    user.type == 'ReferralAgency' # RA can see specific landlord
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