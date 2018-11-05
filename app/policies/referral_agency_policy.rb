class ReferralAgencyPolicy
  attr_reader :user, :referral_agency

  def initialize(user, referral_agency)
    @user = user
    @referral_agency = referral_agency
  end

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
    if user.type == 'ReferralAgency' 
      return user.id == referral_agency.id
    end
    return false
  end

  def destroy?
    if user.type == 'ReferralAgency' 
      return user.id == referral_agency.id
    end
    return false
  end

end