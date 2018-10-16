class ApplicationController < ActionController::Base
	before_action :configure_permitted_parameters, if: :devise_controller?

	protected

	def configure_permitted_parameters
	  devise_parameter_sanitizer.permit(:sign_up) do |u|
	    u.permit(:name, :type, :email, :password, :phone, :address)
	  end
	end
end
