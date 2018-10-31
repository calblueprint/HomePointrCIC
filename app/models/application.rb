class Application < ApplicationRecord
  enum status: { rejected: 0, received: 1, interview: 2, housed: 3 }
  belongs_to :property
  belongs_to :info
  validates :status, :property_id, :info_id, presence: true
  def self.policy_class
    AppPolicy
  end
end
