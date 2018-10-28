class PropertyPolicy < ApplicationPolicy
  attr_reader :user, :property

  def initialize(user, property)
    @user = user
    @property = property
  end

  # def index?
  #   user.admin? #RA can see all properties
  # end

  def show?
    user.type == 'ReferralAgency' || Property.where(landlord: user).exists?(:id => property.id)
    #if @property.id in user.propertyIDs || user.admin? true else false #RA can see specific property, but Landlord can only see property if its one of theirs
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    user.type == 'Landlord' # only Landlord can update a property, and landlords aren't admins
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
        scope.all #RA can see ALL PROPERTIES!
      else 
        # landlord_property_ids = user.properties.ids
        scope.where(landlord: user)
      end
    end
  end
end