class Api::PropertiesController < ApplicationController
  respond_to :json

  def create
    @property = Property.new(property_params)
    if @property.save
      render json: @property
    else
      render json: { errors: @property.errors.messages }
    end
  end

  def update
    @property = Property.find(params[:id])
    if @property.update(property_params)
      render json: @property
    else
      render json: { errors: @property.errors.messages }
    end
  end

  def destroy
    @property = Property.find(params[:id])
    if @property.destroy
      render json: @property
    else
      render json: { errors: @property.errors.messages }
    end
  end

  private
    
  def property_params
    params.require(:property).permit(
      :capacity,
      :description,
      :landlord_id,
      :rent,
      :size,
      :property_type,
      :housing_type,
      :date_available,
      :location
    )
  end
end
