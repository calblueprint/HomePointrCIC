# frozen_string_literal: true

class SessionsController < Devise::SessionsController
  skip_before_action :require_login

  # def create
  #   @user = User.find_by_email(params[:email])
  #   if @user and @user.valid_password? params[:password]
  #     sign_in(:user, @user)
  #     flash[:success] = "Successfully signed in!"
  #   else
  #     flash[:danger] = "Error signing in"
  #   end
  # end

end
