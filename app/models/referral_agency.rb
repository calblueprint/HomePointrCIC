class ReferralAgency < User
  has_many :tenants, dependent: :destroy
end
