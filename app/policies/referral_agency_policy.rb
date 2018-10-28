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
      #guessing that this way is shorter because there's less applications per property than applications per tenant in an RA 
      user.properties.each do |property|
        if property.applications 
          property.applications.each do |app|
            if app.info.tenant.referral_agency == referral_agency
              return true
            end
          end
        end
      end
    end #if user is a landlord, need to check that referral agency has applied to one of the landlord's properties
    return false
  end
end