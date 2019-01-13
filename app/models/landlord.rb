# frozen_string_literal: true

class Landlord < User
  has_many :properties, dependent: :destroy
end
