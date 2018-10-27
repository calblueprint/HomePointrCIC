class LandlordsController < ApplicationController
  def create
  	landlord = Landlord.new(landlord_params)
  	if landlord.save!
  		redirect_to landlords_show_url
  	else
  		render json: { errors: landlord.errors.messages }
	  end
  end

  def show
  	if user_signed_in? 
  	  @landlord = Landlord.find(params[:id])
      authorize @landlord
  	  @properties = @landlord.properties
  	else
      # if current user is referral agency, should still be able to see. 
  		redirect_to '/users/sign_up'
  	end
  end

  def update
  	# if params[:id] == current_user.id
	  @landlord = Landlord.find(params[:id])
	  if @landlord.update(landlord_params)
	  	redirect_to landlords_show_url
	  else
	  	render json: { errors: @landlord.errors.messages }
	  end 
  	# else
  	# 	puts('you do not have access to this page')
  	# end
  end

  def index
    @landlords = Landlord.all
    authorize @landlords
  end

  def destroy
  	# if params[:id] == current_user.id
  	@landlord = Landlord.find(params[:id])
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
    params.require(:landlord).permit(:email, :password, :name, :address, :phone)
  end
end
