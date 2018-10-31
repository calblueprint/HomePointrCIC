class LandlordPolicy
  attr_reader :user, :landlord

  def initialize(user, landlord)
    @user = user
    @landlord = landlord
  end

  def show?
    user.type == 'ReferralAgency' || user.id == landlord.id # RA can see all landlords but landlord can only see his own profile
  end
end