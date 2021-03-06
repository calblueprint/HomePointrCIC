# frozen_string_literal: true

class LandlordPolicy
  attr_reader :user, :landlord

  def initialize(user, landlord)
    @user = user
    @landlord = landlord
  end

  def show?
    user.type == 'ReferralAgency' || user.id == landlord.id
  end

  def edit?
    update?
  end

  def update?
    user.type == 'Landlord' && user.id == landlord.id
  end

  def destroy?
    update?
  end
end
