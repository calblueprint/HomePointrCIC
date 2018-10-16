class LandlordsController < ApplicationController
  def create
  	if current_user.type == 'Landlord'
	  	landlord = Landlord.new(landlord_params)
	  	landlord.save!
	  	redirect_to landlords_show_url
	  end
  end

  def show
  	if user_signed_in? and current_user.type == 'Landlord'
  	  @landlord = current_user
  	  @properties = @landlord.properties
  	end
  end

  def update
  	if user_signed_in?
  	  @landlord = Landlord.find(params[:id])
  	  @landlord.update!
  	  redirect_to landlords_show_url
  	end
  end

  def delete
  	@landlord = Landlord.find(params[:id])
  	@landlord.find(params[:id]).destroy
  	redirect_to landlords_show_url
  end

  private

  def landlord_params
    params.require(:landlord).permit(:email, :password, :name, :address, :phone)
  end
end
