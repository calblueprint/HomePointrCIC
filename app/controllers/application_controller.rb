class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?

  def show
    if user_signed_in? and current_user.type == 'Landlord'
      @state = landlord_initial_state
    elsif user_signed_in? and current_user.type == 'ReferralAgency'
      @state = referral_agency_inital_state 
    else
      redirect_to '/'
    end
  end

  def render_json_message
    render json: {
      }
  end

	protected

	def configure_permitted_parameters
	  devise_parameter_sanitizer.permit(:sign_up) do |u|
	    u.permit(:name, :type, :email, :password, :phone, :address)
	  end
	end
end
