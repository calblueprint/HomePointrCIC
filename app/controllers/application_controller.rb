class ApplicationController < ActionController::Base
  include Pundit
  before_action :require_login
  # after_action :verify_authorized
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  private

  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore

    flash[:error] = "You cannot #{policy_name}.#{exception.query}"
    redirect_to errors_show_path
  end

  def require_login
    unless user_signed_in?
      flash[:error] = "You must be logged in to access this section"
      redirect_to unauthenticated_root_path
    end
  end

  def show
    if user_signed_in? and current_user.type == 'Landlord'
      @state = landlord_initial_state
    elsif user_signed_in? and current_user.type == 'ReferralAgency'
      @state = referral_agency_inital_state 
    else
      redirect_to '/'
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |u|
      u.permit(:name, :type, :email, :password, :phone, :address)
    end
  end
end