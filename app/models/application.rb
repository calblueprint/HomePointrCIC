# frozen_string_literal: true

class Application < ApplicationRecord
  enum status: { rejected: 0, received: 1, interview: 2, housed: 3 }
  has_one_attached :form
  belongs_to :property, required: false
  belongs_to :tenant, required: false
  validates :status, :property_id, :tenant_id, presence: true
  validates :status, inclusion: { in: statuses.keys }

  def self.policy_class
    AppPolicy
  end

  def hidden
    ''"
    Returns whether this application should be hidden or not.
    "''
    status_key = status.to_s
    status = Application.statuses[status_key]
    if status == 0
      return true
    elsif status > 1
      return false
    else
      if tenant.priority < 2
        return true
      else
        return false
      end
    end
  end
end
