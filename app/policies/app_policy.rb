class AppPolicy < ApplicationPolicy
  attr_reader :user, :app

  def initialize(user, app)
    @user = user
    @app = app
  end

  def self.permitted_attributes
    # if user.type == 'ReferralAgency' 
      [:status, :property_id, :info_id]
    # else
    #   [:status]
    # end
  end

  # Returns true if a Referral Agency is viewing one of their own tenants' applications, 
  # or if a Landlord is viewing the application of a tenant that has applied to one of their properties.
  def show?
    if user.type == 'ReferralAgency' 
      user.tenants.include?(app.info.tenant)
    else
      user.properties.each do |property|
        if property.applications.include?(app)
          return true
        end
      end
      return false
    end 
  end

  def create?
    user.type == 'ReferralAgency' && user.tenants.include?(app.info.tenant)
  end

  def new?
    create?
  end

  def update?
    show?
  end

  def edit?
    update?
  end

  def destroy?
    false
  end
end