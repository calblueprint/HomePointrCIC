class PropertyPolicy < ApplicationPolicy
  attr_reader :user, :property

  def initialize(user, property)
    @user = user
    @property = property
  end

  def show?
    user.type == 'ReferralAgency' || user.properties.include?(property)
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    user.type == 'Landlord' && user.properties.include?(property)
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
        scope.all 
      else 
        scope.where(landlord: user)
      end
    end
  end
end