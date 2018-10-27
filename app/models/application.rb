class Application < ApplicationRecord
  enum status: { rejected: 0, received: 1, interview: 2, housed: 3 }
  belongs_to :property
  belongs_to :info
  validates :status, :property_id, :info_id, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates_associated :info, :property
end
