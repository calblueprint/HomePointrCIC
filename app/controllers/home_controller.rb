class HomeController < ApplicationController
	# before_action :require_login, except: :index
  def index
  	if user_signed_in?
  		if current_user.type == 'Landlord'
  			redirect_to landlord_path(current_user)
  		else 
  			redirect_to referral_agency_path(current_user)
  		end
  	end
  end
end
