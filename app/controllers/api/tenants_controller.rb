# frozen_string_literal: true

class Api::TenantsController < ApplicationController
  respond_to :json

  def create
    @tenant = Tenant.new(tenant_params)
    authorize @tenant
    if @tenant.save
      Info.create(tenant_id: @tenant.id)
      if ActiveStorage::Blob.last.id != $activestoragestart
        a = ActiveStorage::Blob.last
        @tenant.avatar.attach(a) if a.image?
      end
      render json: @tenant
    else
      render json: { errors: @tenant.errors.messages }
    end
  end

  def update
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    if @tenant.update(tenant_params)
      render json: @tenant
    else
      render component: 'ErrorMessage', message: @tenant.errors.messages
    end
  end

  def destroy
    @tenant = Tenant.find(params[:id])
    authorize @tenant
    if @tenant.destroy
      render json: @tenant
    else
      render json: { errors: @tenant.errors.messages }
    end
  end

  private

  def tenant_params
    params.require(:tenant).permit(
      :name,
      :description,
      :email,
      :phone,
      :rent_min,
      :rent_max,
      :housing_type,
      :property_type,
      :num_bedrooms,
      :location,
      :referral_agency_id,
      :date_needed,
      :avatar
    )
  end
end
