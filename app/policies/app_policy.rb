class AppPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    user.admin? # RA can see all Applications
  end

  def show?
    user.admin? # RA can see specific Application
  end

  def create?
    user.admin? # RA can create an Applicatoin
  end

  def new?
    create?
  end

  def update?
    user.admin? # RA can update an Application
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