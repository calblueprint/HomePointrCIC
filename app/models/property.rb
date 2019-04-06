# frozen_string_literal: true

class Property < ApplicationRecord
  # locations not set
  belongs_to :landlord
  has_many_attached :images, dependent: :destroy
  has_one_attached :form, dependent: :destroy
  has_many :applications, dependent: :destroy
  has_many :tenants, through: :applications
  enum housing_type: { other_housing_type: 0, supported_housing: 1, temporary_hostel: 2, sheltered_housing: 3, private_sector_leasing: 4, private_property: 5, care_home: 6, retired_housing: 7, council_housing: 8, housing_association: 9, student_housing: 10, mid_market_rent: 11, housing_first: 12, rehab_center: 13, refuge_center: 14, youth_hostel: 15 }
  enum property_type: { other_property_type: 0, basement: 1, ground: 2, four_in_a_block: 3, flat: 4, maisonette: 5, main_door_flat: 6, multi_story_flat: 7, house: 8, studio: 9 }
  enum location: { other_location: 0, edinburgh: 1, glasgow: 2, falkirk: 3, dundee: 4, west_lothian: 5 }
  validates :capacity, :description, :landlord_id, :rent, :property_type, :housing_type, :date_available, :location, presence: true
  validates_associated :landlord
end
