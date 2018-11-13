class ApplicationController < ActionController::Base
	# before_action :require_login, except: [:new, :create]
	before_action :configure_permitted_parameters, if: :devise_controller?

	protected

	def configure_permitted_parameters
	  devise_parameter_sanitizer.permit(:sign_up) do |u|
	    u.permit(:name, :type, :email, :password, :phone, :address)
	  end
	end

	private
 
  def require_login
    unless user_signed_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to unauthenticated_root_path
    end
  end
end
