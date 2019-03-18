# frozen_string_literal: true

class AppPolicy < ApplicationPolicy
  attr_reader :user, :app

  def initialize(user, app)
    @user = user
    @app = app
  end

  def self.permitted_attributes
    if user.type == 'ReferralAgency'
      %i[status property_id tenant_id]
    else
      [:status]
    end
  end

  # Returns true if a Referral Agency is viewing one of their own tenants' applications,
  # or if a Landlord is viewing the application of a tenant that has applied to one of their properties.
  def show?
    if user.type == 'ReferralAgency'
      user.tenants.include?(app.tenant)
    else
      user.properties.each do |property|
        return true if property.applications.include?(app)
      end
      false
    end
  end

  def create?
    user.type == 'ReferralAgency' && user.tenants.include?(app.tenant)
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
