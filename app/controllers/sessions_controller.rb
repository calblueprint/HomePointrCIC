#frozen_string_literal: true

class SessionsController < Devise::SessionsController
  skip_before_action :require_login
  before_action :configure_sign_in_params, only: [:create]

 # GET /resource/sign_in
  def new
    super
  end

  #POST /resource/sign_in
  def create
    super
  end

  #DELETE /resource/sign_out
  def destroy
    super
  end

  protected

  #If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end

  def require_login
      unless user_signed_in?
        flash[:error] = "You must be logged in to access this section"
        redirect_to unauthenticated_root_path
      end
    end
end
