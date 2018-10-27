class Info < ApplicationRecord
  has_many :applications, dependent: :destroy
  has_many :properties, :through => :applications
  belongs_to :tenant
  validates :tenant_id, presence: true
  validates_associated :tenant
end
