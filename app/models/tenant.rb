class Tenant < ApplicationRecord
  belongs_to :referral_agency
  has_one :info, dependent: :destroy
  enum housing_type: { other_housing_type: 0, supported_housing: 1, temporary_hostel: 2, sheltered_housing: 3, private_sector_leasing: 4, private_property: 5, care_home: 6, retired_housing: 7, council_housing: 8, housing_association: 9, student_housing: 10, mid_market_rent: 11, housing_first: 12 }
  enum property_type: { other_property_type: 0, basement: 1, ground: 2, four_in_a_block: 3, flat: 4, maisonette: 5, main_door_flat: 6, multi_story_flat: 7, house: 8, studio: 9 }
  enum location: { other_location: 0, edinburgh: 1, glasgow: 2, falkirk: 3, dundee: 4, west_lothian: 5 }
  validates :name, :description, :email, :phone, :nino, :rent_min, :rent_max, :housing_type, :property_type, :num_bedrooms, :location, :referral_agency_id, :date_needed, presence: true

  def priority
    """Returns priority of tenant:
    0 - matched with a house
    1 - interviewing with a house
    2 - applied
    3 - rejected
    4 - not applied yet
    """
    if !info
      return
    end
    apps = info.applications
    if !apps
      return 4
    end
    status_map = Application.statuses
    statuses = apps.map{ |a| status_map[a.status] }
    max_status = statuses.max
    return 3 - max_status
  end
end
