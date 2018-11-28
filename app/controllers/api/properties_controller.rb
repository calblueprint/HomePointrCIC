class Api::PropertiesController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def delete_image_attachment
    @image = ActiveStorage::Blob.find_signed(params[:id])
    @image.purge
    redirect_to collections_url
  end

  def create
    @property = Property.new(property_params)
    authorize @property
    if @property.save
      render json: @property
    else
      render json: { errors: @property.errors.messages }
    end
  end

  def update
    @property = Property.find(params[:id])
    authorize @property
    if @property.update(property_params)
      render json: @property
    else
      render json: { errors: @property.errors.messages }
    end
  end

  def destroy
    @property = Property.find(params[:id])
    authorize @property
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
      :location,
      :images
    )
  end
end
