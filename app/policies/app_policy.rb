class AppPolicy < ApplicationPolicy
  attr_reader :user, :app

  def initialize(user, app)
    @user = user
    @app = app
  end

  def permitted_attributes
    if user.type == 'ReferralAgency' 
      [:status, :property_id, :info_id]
    else
      [:status]
    end
  end

  def show?
    if user.type == 'ReferralAgency' 
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
    user.type == 'ReferralAgency' && user.tenants.include?(app.info.tenant)# RA can create an Applicatoin
  end

  def new?
    create?
  end

  def update?
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

  def edit?
    update?
  end

  def destroy?
    false
  end
end