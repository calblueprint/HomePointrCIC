# frozen_string_literal: true

class ReferralAgency < User
  has_many :tenants, dependent: :destroy
end
