class ApplicationController < ActionController::Base
	include Pundit
	# after_action :verify_authorized
	before_action :configure_permitted_parameters, if: :devise_controller?

	rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
	private

  def user_not_authorized(exception)
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to root_path
  end

	protected

	def configure_permitted_parameters
	  devise_parameter_sanitizer.permit(:sign_up) do |u|
	    u.permit(:name, :type, :email, :password, :phone, :address)
	  end
	end

end
