# frozen_string_literal: true

class Tenant < ApplicationRecord
  # locations not set
  belongs_to :referral_agency
  has_many :applications, dependent: :destroy
  has_one_attached :avatar, dependent: :destroy
  has_one_attached :form, dependent: :destroy
  enum housing_type: { other_housing_type: 0, supported_housing: 1, temporary_hostel: 2, sheltered_housing: 3, private_sector_leasing: 4, private_property: 5, care_home: 6, retired_housing: 7, council_housing: 8, housing_association: 9, student_housing: 10, mid_market_rent: 11, housing_first: 12, rehab_center: 13, refuge_center: 14, youth_hostel: 15 }
  enum property_type: { other_property_type: 0, basement: 1, ground: 2, four_in_a_block: 3, flat: 4, maisonette: 5, main_door_flat: 6, multi_story_flat: 7, house: 8, studio: 9 }
  enum location: { other_location: 0, edinburgh: 1, glasgow: 2, falkirk: 3, dundee: 4, west_lothian: 5 }
  validates :name, :description, :email, :phone, :rent_min, :rent_max, :housing_type, :property_type, :number_of_bedrooms, :location, :referral_agency_id, :date_needed, presence: true
  validates :email, format: { with: Devise.email_regexp }
  validates :housing_type, inclusion: { in: housing_types.keys }
  validates :property_type, inclusion: { in: property_types.keys }
  validates :location, inclusion: { in: locations.keys }
  validates_associated :referral_agency

  def priority
    ''"Returns priority of tenant:
    0 - matched with a house
    1 - interviewing with a house
    2 - applied
    3 - rejected
    4 - not applied yet
    "''
    # return unless tenant

    apps = self.applications
    return 4 if apps.empty?

    status_map = Application.statuses
    all_statuses = apps.map do |a|
      status_map.key?(a.status.to_s) ?
      status_map[a.status.to_s] : -1
    end
    3 - all_statuses.max
  end
end
