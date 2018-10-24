class PropertyPolicy < ApplicationPolicy
  attr_reader :user, :property

  def initialize(user, property)
    @user = user
    @property = property
  end

  def index?
    user.admin? #referral agency can see all properties
  end

  def show?
    user.admin? #RA can see specific property
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
        scope.all #RA can see ALL PROPERTIES!
      else 
        #scope.where(propertyid in landlord's properties) #Landlord can see only properties that belong to him 
      end
  end
end