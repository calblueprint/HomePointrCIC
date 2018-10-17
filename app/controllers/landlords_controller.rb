class LandlordsController < ApplicationController
  def create
  	landlord = Landlord.new(landlord_params)
  	@error = false
  	if landlord.save!
  		redirect_to landlords_show_url
  	else
  		@error = true
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
  	@error = false
  	if params[:id] == current_user.id
  	  @landlord = Landlord.find(params[:id])
  	  @landlord.update!
  	else
  		@error = true
  	redirect_to landlords_show_url
  	end
  end

  def delete
  	@error = false
  	if params[:id] == current_user.id
	  	@landlord = Landlord.find(params[:id])
	  	@landlord.find(params[:id]).destroy
	  else 
	  	@error = true
	  redirect_to landlords_show_url
	  end
  end

  private

  def landlord_params
    params.require(:landlord).permit(:email, :password, :name, :address, :phone)
  end
end
