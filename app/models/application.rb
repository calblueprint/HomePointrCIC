class Application < ApplicationRecord
  enum status: { rejected: 0, received: 1, interview: 2, housed: 3 }
  belongs_to :property
  belongs_to :info
  validates :status, :property_id, :info_id, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates_associated :info, :property

  def hidden  
  """
  Returns whether this application should be hidden or not.
  """
    status_key = status.to_s
    status = Application.statuses[status_key]
    if status == 0
      return true
    elsif status > 1
      return false
    else
      if info.tenant.priority < 2
        return true
      else
        return false
      end
    end
  end
end
