# frozen_string_literal: true

class LandlordsController < ApplicationController
  def create
    landlord = Landlord.new(landlord_params)
    authorize landlord
    if landlord.save!
      redirect_to landlords_show_url
    else
      render json: { errors: landlord.errors.messages }
    end
  end

  def show
    if user_signed_in?
      redirect_to '/'
    else
      redirect_to '/users/sign_up'
    end
  end

  def edit
    @landlord = Landlord.find(params[:id])
    authorize @landlord
    @current_userID = current_user.id
    @user = current_user
    @current_password = @landlord.encrypted_password
    @email = @landlord.email
  end

  def update
    @landlord = Landlord.find(params[:id])
    authorize @landlord
    if @landlord.update(landlord_params)
      flash[:success] = "Account updated successfully!"
    else
      flash[:danger] = "Account failed to update."
    end
  end

  def destroy
    # if params[:id] == current_user.id
    @landlord = Landlord.find(params[:id])
    authorize @landlord
    @landlord.destroy
    if @landlord.destroyed?
      redirect_to new_user_registration_path
    else
      render json: { errors: @landlord.errors.messages }
    end
    # else
    #   puts('you do not have access to this page')
    # end
  end

  private

  def landlord_params
    params.require(:landlord).permit(:email, :encrypted_password, :name, :address, :phone)
  end
end
