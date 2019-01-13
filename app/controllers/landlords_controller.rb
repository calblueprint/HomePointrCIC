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
    @mode = 'edit'
    @type = 'landlords'
    @nice_field_names = []
    @field_names = Landlord.column_names[11..-2] + %w[password email]
    @field_names.each do |i|
      @nice_field_names << i.titleize
    end
    @landlord = Landlord.find(params[:id])
    authorize @landlord
    @prev_values = @landlord.attributes.values[11..-2]
    @prev_values << nil
    @prev_values << @landlord.email
    @field_types = %w[textbox textbox textbox password textbox]
  end

  def update
    @landlord = Landlord.find(params[:id])
    authorize @landlord
    if @landlord.update(landlord_params)
      redirect_to root_path
    else
      render json: { errors: @landlord.errors.messages }
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
    params.require(:landlord).permit(:email, :password, :name, :address, :phone)
  end
end
