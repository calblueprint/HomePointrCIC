class Landlord < User
  has_many :properties, dependent: :destroy
end
