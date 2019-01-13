# frozen_string_literal: true

class ReferralAgencyPolicy
  attr_reader :user, :referral_agency

  def initialize(user, referral_agency)
    @user = user
    @referral_agency = referral_agency
  end

  # Returns true if a Referral Agency is viewing their own profile,
  # or if a Landlord is viewing a Referral Agency that has a tenant
  # that has applied to one of their properties.
  def show?
    if user.type == 'ReferralAgency'
      return user.id == referral_agency.id
    else
      user.properties.each do |property|
        next unless property.applicationsproperty.applications&.each do |app|
          return true if app.info.tenant.referral_agency == referral_agency
        end
      end
    end

    false
  end

  def edit?
    update?
  end

  def update?
    return user.id == referral_agency.id if user.type == 'ReferralAgency'

    false
  end

  def destroy?
    update?
  end
end
