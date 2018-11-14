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
        if property.applications 
          property.applications.each do |app|
            if app.info.tenant.referral_agency == referral_agency
              return true
            end
          end
        end
      end
    end 
    return false
  end

  def edit?
    update?
  end

  def update?
    if user.type == 'ReferralAgency' 
      return user.id == referral_agency.id
    end
    return false
  end

  def destroy?
    update?
  end

end