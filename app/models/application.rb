class Application < ApplicationRecord
  enum status: { rejected: 0, received: 1, interview: 2, housed: 3 }
  belongs_to :property
  belongs_to :info

  def hidden  
  """
  Returns whether this application should be hidden or not.
  """
    if status == 0
      return true
    elsif status > 1
      return false
    else
      if info.tenant.priority < 2
        return true
      return false
    end
  end
end
