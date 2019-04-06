# frozen_string_literal: true

class Api::PropertiesController < ApplicationController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def delete_image_attachment
    @image = ActiveStorage::Attachment.find(params[:image_id])
    if @image.purge
      head :ok
    else
      puts @image.errors.messages
      render json: { errors: @image.errors.messages }
    end
  end

  def create
    @property = Property.new(property_params)
    authorize @property
    if @property.save
      if ActiveStorage::Blob.last.id != $activestoragestart
        a = $activestoragestart
        add_files_to_property(a + 1, @property)
      end
      render json: @property
    else
      render json: { errors: @property.errors.messages }
    end
  end

  def add_files_to_property(start, property)
    imagedone = false
    formdone = false
    ActiveStorage::Blob.last.id.downto(start).each do |i|
      if imagedone && formdone
        break
      else
        a = ActiveStorage::Blob.find(i)
        unless imagedone
          if a.image?
            property.images.attach(a)
            imagedone = true
          end
        end

        unless formdone
          unless a.image?
            property.form.attach(a)
            formdone = true
          end
        end
      end
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
      :address,
      :number_of_bedrooms,
      :number_of_bathrooms,
      :floor_number,
      :mobility_aids,
      :furniture,
      :utilities_included,
      :accessible_shower,
      :car_parking,
      :lift_access,
      :images,
      :form
    )
  end
end
