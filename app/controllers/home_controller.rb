class HomeController < ApplicationController
  def index
  	if user_signed_in?
  		if current_user.type == 'Landlord'
  			landlord_path(current_user)
  		else 
  			referral_agency_path(current_user)
  		end
  	end
  end
end
